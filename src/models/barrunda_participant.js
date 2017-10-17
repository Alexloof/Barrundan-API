import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BarrundaParticipantSchema = new Schema({
  barrundaId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const Barrunda_participant = mongoose.model(
  'Barrunda_participant',
  BarrundaParticipantSchema
)
export default Barrunda_participant
