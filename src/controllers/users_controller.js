import mongoose from 'mongoose'
import axios from 'axios'
import { error } from '../models/error'
import Joi from 'joi'

import { returnWithToken } from '../config/jwt'
import User from '../models/user'
import { savePushToken, sendPushs} from '../helpers/push'

const facebookUrl =
  'https://graph.facebook.com/me?fields=id,first_name,picture&access_token='

// Facebook token.
export const createUserReqeustSchema = Joi.object({
  token: Joi.string().required()
})
export const createUser = async (req, res, next) => {
  const token = req.body.token
  let result
  try {
    result = await axios.get(`${facebookUrl}${token}`)
  } catch (e) {
    return next(error(e.response.status, e.response.data.error.message))
  }
  const { id, first_name, picture } = result.data

  const findUser = await User.findOne({ facebookId: id })
  if (findUser) {
    return res.send(returnWithToken(findUser))
  }

  try {
    const user = await User.create({
      facebookId: id,
      name: first_name,
      imgUrl: picture.data.url
    })
    res.send(returnWithToken(user))
  } catch (e) {
    return next(err)
  }
}

// Push token.
export const registerForPushReqeustSchema = Joi.object({
  pushToken: Joi.string().required(),
  userId: Joi.string().required()
})
export const registerForPush = async (req, res, next) => {
  const userId = req.body.userId
  const pushToken = req.body.pushToken
  const findUser = await User.findOne({ _id: userId })
  if (findUser) {
    await savePushToken(findUser, pushToken)
    return res.send({ status: 'Ok' })
  } else {
    return next(error(400, 'Not found'))
  }
}

export const sendPushToAllUsersReqeustSchema = Joi.object({
    message: Joi.string().required(),
    secret:Joi.string().required()
})
export const sendPushToAllUsers = async (req, res, next) => {
  if(req.body.secret != 'blubblub'){ // KANSKE SKAPA NÅGON HASHAD SECRET,.
    return next(error(401, 'Unauthorized'))
  }

  try {
      const users = await User.find()
      let tokens = [];
      users.forEach((user) => {
          tokens = tokens.concat(user.pushTokens);
      })
      sendPushs(tokens,req.body.message);
      return res.send({status:'Ok'})
  }catch (err){
      return next(err)
  }
}
