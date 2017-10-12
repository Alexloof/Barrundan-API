import mongoose from 'mongoose'
import axios from 'axios'

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
export const createUser = async (req, res, next) => {
  //Todo Validera request
  // kallar på facebook api.
  const token = req.body.token
  let result
  try {
    result = await axios.get(`${facebookUrl}${token}`)
  } catch (e) {
    return next({
      message: e.response.data.error.message,
      code: e.response.status
    })
  }
  const { id, first_name, picture } = result.data

  const findUser = await User.findOne({ facebookId: id })
  if (findUser) {
    return res.send(returnWithToken(findUser._id))
  }
  const user = new User()
  user.facebookId = id
  user.name = first_name
  user.imgUrl = picture.data.url

  user.save((err, user) => {
    if (err) {
      return next(err)
    } else {
      res.send(returnWithToken(user._id))
    }
  })
}
