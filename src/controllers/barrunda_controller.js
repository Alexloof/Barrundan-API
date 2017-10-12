import mongoose from 'mongoose'
import fetchBars from '../helpers/googlePlaces'
import pickRandomBars from '../helpers/pickRandomBars'
import Barrunda from '../models/barrunda'

import { createAll } from '../helpers/createBarRound'
// temp hårdkodad till Malmö
export const fetchBarrunda = async (req, res, next) => {
  const runda = await Barrunda.findOne({})
  if (runda) {
    return res.send(runda)
  } else {
    return res.status(400).send({ error: 'Could not find Barrunda' })
  }
}

export const createBarrunda = async (req, res, next) => {
  await createAll()
  res.send({ dinmamma: 'okej' })
}

export const addUserToBarrunda = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({ error: 'Must provide a userId' })
  }
  const userId = req.body.userId

  ///funkar inte!
  Barrunda.update(
    { _id: '59df7f2948506e299cbd57e8' },
    { $push: { participants: userId } },
    (err, barrunda) => {
      if (err) {
        console.log(err)
        return res.send(err)
      } else {
        return res.send(barrunda)
      }
    }
  )
}

export const fetchBarrundaParticipants = async (req, res, next) => {
  const runda = await Barrunda.findOne({})
  if (runda) {
    const participants = runda.participants
    res.send(participants)
  } else {
    return next({ error: e })
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
