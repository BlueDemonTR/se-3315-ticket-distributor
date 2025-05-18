import { Seat, Ticket, User } from '../models'
import { escapeString } from '../lib'

async function buyTicket(req, res, id) {
  const { body } = req,
    { ticketId } = body

  const ticket = await Ticket.findById(ticketId)

  return res.send({ ticket })
}

export default buyTicket