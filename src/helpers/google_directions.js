import axios from 'axios'
import { GOOGLE_PLACE_KEY as apiKey } from '../config/settings'

const directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json?'

export const getRoute = async (start, end, points) => {
  try {
    const waypoints = points.map(p => {
      return '|place_id:' + p.googlePlaceId
    })
    const response = await axios.get(
      `${directionsUrl}origin=place_id:${start.googlePlaceId}&destination=place_id:${end.googlePlaceId}&waypoints=optimize:true${waypoints.join('')}&key=${apiKey}`
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}
