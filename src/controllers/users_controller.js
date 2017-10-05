import mongoose from 'mongoose'
import axios from 'axios'

import User from '../models/user'

const facebookUrl =
  'https://graph.facebook.com/me?fields=id,name,picture&access_token='

export const listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.send(err)
    res.send(user)
  })
}

// Facebook token.
export const createUser = async (req, res, next) => {
  //Todo Validera request

  // kalla på facebook api.
  const token = req.body.token

  // Todo kolla upp hur man gör med
  const result = await axios.get(`${facebookUrl}${token}`);

  return result;
  //console.log(result)

  //res.send('')
  //const newUser = new User(req.body)

  /*
    newUser.save((err, user) => {
      if (err) {
        switch (err.code) {
          case 11000:
            return res.send({ message: 'Email adressen är upptagen!' })
          default:
            return res.send(err)
        }
      }
      res.send(user)
    })*/
}
