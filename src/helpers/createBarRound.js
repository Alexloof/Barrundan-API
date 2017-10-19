import googlePlaces from './googlePlaces'
import pickRandomBars from './pickRandomBars'
import { firstAndLastBar } from './sortByDistance'
import { getRoute } from './google_directions'
import Barrunda from '../models/barrunda'

const cities = [
  {
    name: 'malmö',
    location: '55.607734, 13.000319',
    radius: 1000,
    type: 'bar',
    keyword: 'pub',
    numberOfBars: 4
  }
]

// ska bli krön jobb sen
export const createAll = () => {
  cities.forEach(city => {
    createBarRound(city)
  })
  console.log('hej')
}

const createBarRound = async city => {
  const googlePlaceBars = await googlePlaces(city)
  const bars = pickRandomBars(googlePlaceBars, city.numberOfBars).map(bar => {
    return {
      name: bar.name,
      rating: bar.rating,
      address: bar.vicinity,
      location: bar.geometry.location,
      googlePlaceId: bar.place_id
    }
  })
  const firstAndLast = firstAndLastBar(bars)

  const waypoints = bars.filter(bar => {
    if (
      bar.googlePlaceId != firstAndLast[0].googlePlaceId &&
      bar.googlePlaceId != firstAndLast[1].googlePlaceId
    ) {
      return bar
    }
  })

  const routes = await getRoute(firstAndLast[0], firstAndLast[1], waypoints)
  console.log(routes)

  let randomBars = []
  routes.geocoded_waypoints.map(point => {
    bars.forEach(bar => {
      if (bar.googlePlaceId == point.place_id) {
        randomBars.push(bar)
      }
    })
  })

  // Lägg till Datum möget - Kör Kronjobb kl 20:00 på söndag?
  const now = new Date()
  const barRoundStartTime = now.setDate(now.getDate() + 6)
  const barStartTimes = [
    barRoundStartTime,
    barRoundStartTime + 3600000,
    barRoundStartTime + 3600000 * 2,
    barRoundStartTime + 3600000 * 3
  ]

  let finalBarList = []
  randomBars.map((bar, index) => {
    finalBarList.push({
      ...bar,
      startTime: barStartTimes[index],
      endTime: barStartTimes[index] + 3600000
    })
  })
  // datum mög klart

  const newRunda = new Barrunda({
    city: city.name,
    bars: finalBarList
  })

  newRunda.save((err, runda) => {
    if (err) {
      console.log(err)
    }
    console.log(runda)
  })
}
