import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
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
  active: {
    type: Boolean,
    default: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

const Barrunda = mongoose.model('Barrunda', BarrundaSchema)
export default Barrunda
