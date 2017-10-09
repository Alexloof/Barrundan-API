import axios from 'axios'
import { google_places_key as apiKey } from '../API/api_keys'

const placesUrl =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

export default async place => {
  try {
    console.log(`${placesUrl}location=${place.location}&radius=${place.radius}&type=${place.type}&keyword=${place.keyword}&key=${apiKey}`)
    const placesResponse = await axios.get(
      `${placesUrl}location=${place.location}&radius=${place.radius}&type=${place.type}&keyword=${place.keyword}&key=${apiKey}`
    )
    return placesResponse.data.results
  } catch (e) {
    console.log(e)
  }
}
