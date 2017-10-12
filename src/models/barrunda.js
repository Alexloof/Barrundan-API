import mongoose from 'mongoose'
const Schema = mongoose.Schema
import validator from 'validator'

const barSchema = new Schema({
  location: {
    type: Object,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  name: {
    type: String,
    required: true
  }
})

const participantsSchema = new Schema({
  userId: {
    type: String,
    required: true
  }
})

const BarrundaSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  bars: {
    type: [barSchema],
    required: true
  },
  participants: {
    type: [participantsSchema],
    required: false,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

const Barrunda = mongoose.model('Barrunda', BarrundaSchema)
export default Barrunda
