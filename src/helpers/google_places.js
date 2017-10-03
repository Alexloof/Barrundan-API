import axios from 'axios'
import { google_places_key as apiKey } from '../API/api_keys'

const placesUrl =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

const cities = { malmo: '55.607734, 13.000319' }

export default async function(city, radius, type, keyword) {
  console.log('Entered Google Places Call')
  let location
  switch (city) {
    case city.toUpperCase() === 'MALMÖ':
      location = cities.malmo
    default:
      location = cities.malmo
  }

  let placesResponse = axios
    .get(
      `${placesUrl}location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`
    )
    .then(({ data }) => data)

  return await placesResponse
}
