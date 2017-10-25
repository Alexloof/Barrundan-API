import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'
import config from '.'

import User from '../models/user'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.jwt_secret

export const jwt_strategy = new JwtStrategy(
  jwtOptions,
  async (jwt_payload, next) => {
    const user = await User.findOne({ _id: jwt_payload.id })
    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  }
)

export const returnWithToken = user => {
  const payload = { id:user._id }
  const token = jwt.sign(payload, config.jwt_secret)
  return { user: user, token: token }
}
