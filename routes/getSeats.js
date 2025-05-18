import { Seat, Station, Train } from '../models'
import { escapeString } from '../lib'

async function getSeats(req, res, id) {
  const { body } = req,
    { train } = body

  const query = { train }
  const seats = await Seat
    .find(query)

  return res.send({ seats })
}

export default getSeats