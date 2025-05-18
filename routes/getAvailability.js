import { Seat, Ticket } from '../models'
import { escapeString } from '../lib'

async function getAvailability(req, res, id) {
  const { body } = req,
    { train, number } = body

  const query = { train, number }
  const seat = await Seat
    .findOne(query)

  const ticket = await Ticket
    .findOne({ seat })

  return res.send({ available: !!ticket })
}

export default getAvailability