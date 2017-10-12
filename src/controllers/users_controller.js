import mongoose from 'mongoose'
import axios from 'axios'
import { error } from '../models/error'
import Joi from 'joi'

import { returnWithToken } from '../config/jwt'
import User from '../models/user'

const facebookUrl =
  'https://graph.facebook.com/me?fields=id,first_name,picture&access_token='

export const listAllUsers = async (req, res) => {
  try {
    User.find({}, (err, user) => {
      if (err) {
        return res.send(err)
      } else {
        return res.send(user)
      }
    })
  } catch (e) {
    return res.send({ error: e })
  }
}

// Facebook token.
export const createUserReqeustSchema = Joi.object({
    token:Joi.string().required()
})
export const createUser = async (req, res, next) => {
  //Todo Validera request
  // kallar på facebook api.
    console.log("fasölfkalösfklöasflkaslkö")
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
