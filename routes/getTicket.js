import { Seat, Ticket, User } from '../models'
import { escapeString } from '../lib'

async function getTicket(req, res, id) {
  const { body } = req,
    { ticketId } = body

  const ticket = await Ticket
    .findById(ticketId)
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

  return res.send({ ticket })
}

export default getTicket