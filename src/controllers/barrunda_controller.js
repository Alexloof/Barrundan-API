import mongoose from 'mongoose'
import fetchBars from '../helpers/google_places'
import pickRandomBars from '../helpers/pickRandomBars'
import Barrunda from '../models/barrunda'

// temp hårdkodad till Malmö
export const sendBarrunda = async (req, res, next) => {
  const runda = await Barrunda.findOne({ city: 'MALMÖ' })
  res.send(runda)
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
