import { Seat, Station, Ticket, Train } from '../models'
import { escapeString } from '../lib'

async function getSeats(req, res, id) {
  const { body } = req,
    { train } = body

  const query = { train, deleted: { $ne: true } }
  const seats = await Seat
    .find(query)

  console.log(seats.map(x => x._id))

  const tickets = await Ticket.find({
    seat: seats.map(x => x._id),
  })

  console.log(tickets)
  

  const mappedSeats = seats.map(x => ({
    ...x.toObject(),
    occupied: !!tickets.find(y => y.seat.toString() === x._id.toString())
  }))

  return res.send({ seats: mappedSeats })
}

export default getSeats