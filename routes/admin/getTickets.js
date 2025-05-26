import { Seat, Ticket, User } from '../../models'
import { escapeString } from '../../lib'

async function getTickets(req, res, id) {
  const { body } = req,
    { trainId } = body

  const seats = await Seat.find({
    train: trainId
  })

  const seatIds = seats.map(x => x._id)

  const tickets = await Ticket
    .find({ seat: seatIds, deleted: { $ne: true } })
    .populate('owner')
    .populate({
      path: 'seat',
      populate: {
        path: 'train',
        populate: {
          path: 'from to'
        }
      }
    })


  return res.send({ tickets })
}

export default getTickets