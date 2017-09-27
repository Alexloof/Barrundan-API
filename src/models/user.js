import mongoose from 'mongoose'
const Schema = mongoose.Schema
import validator from 'validator'

const UserSchema = new Schema({
  email: {
    required: true,
    type: String,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  sign_up_date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)
export default User
