import mongoose from 'mongoose'
import fetchBars from '../helpers/googlePlaces'
import pickRandomBars from '../helpers/pickRandomBars'
import Barrunda from '../models/barrunda'
import { error } from '../models/error'
import Joi from 'joi'

import { createAll } from '../helpers/createBarRound'

export const fetchBarrunda = async (req, res, next) => {
  try {
    const runda = await Barrunda.findOne({})
    return res.send(runda)
  } catch (err) {
    return next(err)
  }
}

export const createBarrunda = async (req, res, next) => {
  await createAll()
  res.send({ dinmamma: 'okej' })
}

// userId
export const addUserToBarrundaRequestSchema = Joi.object({
  userId: Joi.string().required()
})
export const addUserToBarrunda = async (req, res, next) => {
  const userId = req.body.userId
  try {
    const barrunda = await Barrunda.findOneAndUpdate(
      {},
      { $push: { participants: userId } }
    )
    return res.send(barrunda)
  } catch (err) {
    return next(err.message)
  }
}

export const fetchBarrundaParticipants = async (req, res, next) => {
  try {
    const runda = await Barrunda.findOne({})
    return res.send(runda.participants)
  } catch (err) {
    return next(err)
  }
}

// OBS DENNA ÄR FÖR TEST - SKA REFACTORAS TILL CRONJOB
export const setBarrunda = async (req, res, next) => {
  if (!req.body.city) {
    return res.status(400).send({ error: 'Must provide city' })
  } else if (req.body.city.toUpperCase() !== 'MALMÖ') {
    return res.status(400).send({ error: 'staden är inte aktuell för runda!' })
  }
  const city = req.body.city

  let data = await fetchBars(city, 1000, 'bar', 'pub')
  let bars = data.results.map(bar => {
    return {
      name: bar.name,
      rating: bar.rating,
      address: bar.vicinity,
      location: bar.geometry.location
    }
  })

  const randomBars = pickRandomBars(bars)
  const newRunda = new Barrunda({
    city: req.body.city.toUpperCase(),
    bars: randomBars
  })
  newRunda.save((err, runda) => {
    if (err) {
      return res.send({ error: err })
    }
    res.send({ message: 'success', runda })
  })
}
