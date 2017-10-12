import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  facebookId: {
    unique: true,
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  pushTokens: {
    type: [String],
    required: false,
    default: []
  }
})

const User = mongoose.model('User', UserSchema)
export default User
