import axios from 'axios'
import { GOOGLE_PLACE_KEY as apiKey } from '../config/settings'

const placesUrl =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

export default async place => {
  try {
    console.log(`${placesUrl}location=${place.location}&radius=${place.radius}&type=${place.type}&keyword=${place.keyword}&key=${apiKey}`)
    const placesResponse = await axios.get(
      `${placesUrl}location=${place.location}&radius=${place.radius}&type=${place.type}&keyword=${place.keyword}&opennow=true&key=${apiKey}`
    )
    return placesResponse.data.results
  } catch (e) {
    console.log(e)
  }
}
