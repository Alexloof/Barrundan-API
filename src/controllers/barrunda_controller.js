import mongoose from 'mongoose'
import fetchBars from '../helpers/googlePlaces'
import pickRandomBars from '../helpers/pickRandomBars'
import Barrunda from '../models/barrunda'
import Barrunda_participant from '../models/barrunda_participant'
import User from '../models/user'
import { error } from '../models/error'
import { getLatestRound } from '../helpers/barRound'
import Joi from 'joi'

export const fetchBarrunda = async (req, res, next) => {
  try {
    const runda = await getLatestRound()
    return res.send(runda)
  } catch (err) {
    return next(err)
  }
}

// userId & barrundaId params
export const addUserToBarrundaRequestSchema = Joi.object({
  userId: Joi.string().required(),
  barrundaId: Joi.string().required()
})
export const addUserToBarrunda = async (req, res, next) => {
  const userId = req.body.userId
  const barrundaId = req.body.barrundaId

  try {
    await User.findOne({ _id: userId })
  } catch (err) {
    return next(error(400, 'Finns ingen användare med detta ID'))
  }
  try {
    await Barrunda.findOne({ _id: barrundaId })
  } catch (err) {
    return next(error(400, 'Finns ingen barrunda med detta ID'))
  }
  try {
    const participant = await Barrunda_participant.findOne({
      userId: userId,
      barrundaId: barrundaId
    })
    if (participant) {
      return next(error(400, 'Du deltar redan i barrundan'))
    }
  } catch (err) {
    return next(error(500, 'Något gick snett'))
  }
  try {
    await Barrunda_participant.create({
      userId: userId,
      barrundaId: barrundaId
    })
    return res.send({ status: 'Ok' })
  } catch (err) {
    return next(error(500, 'Något gick snett med att delta i barrundan'))
  }
}

export const fetchBarrundaParticipants = async (req, res, next) => {
  const barrundaId = req.params.barrundaId
  try {
    await Barrunda.findOne({ _id: barrundaId })
  } catch (err) {
    return next(error(400, 'Det finns ingen barrunda med detta ID'))
  }

  try {
    const participants = await Barrunda_participant.find({
      barrundaId: barrundaId
    })
    const userList = participants.map(participant => participant.userId)

    const newUsers = await User.find(
      {
        _id: { $in: userList }
      },
      ['imgUrl', 'name']
    )
    return res.send(newUsers)
  } catch (err) {
    return next(
      error(500, 'Något gick fel med att hämta deltagare för angiven barrunda')
    )
  }
}

// Returnerar den aktuella baren under pågående barrunda annars den första baren
export const fetchCurrentBar = async (req, res, next) => {
  const barrundaId = req.params.barrundaId
  let barrunda
  try {
    barrunda = await Barrunda.findOne({ _id: barrundaId })
  } catch (err) {
    return next(error(400, 'Det finns ingen barrunda med detta ID'))
  }

  const now = new Date()
  barrunda.bars.map(bar => {
    if (now > bar.startTime && now < bar.endTime) {
      return res.send(bar)
    }
  })
  return res.send(barrunda.bars[0])
}
