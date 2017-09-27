import mongoose from 'mongoose'
import User from '../models/user'

export const listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.send(err)
    res.send(user)
  })
}

export const createUser = (req, res) => {
  const newUser = new User(req.body)
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
  })
}
