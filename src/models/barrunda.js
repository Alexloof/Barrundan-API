import mongoose from 'mongoose'
const Schema = mongoose.Schema
import validator from 'validator'

const barSchema = new Schema({

});

const BarrundaSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  bars: {
    type: Array,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

const Barrunda = mongoose.model('Barrunda', BarrundaSchema)
export default Barrunda
