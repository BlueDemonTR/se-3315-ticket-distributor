import { Seat, Station, Ticket, Train, User } from '../../models'
import { escapeString } from '../../lib'

async function cancelTicket(req, res, id) {
  const { body } = req,
    { id: ticketId } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Ticket.findByIdAndDelete(ticketId)

  return res.send(true)
}

export default cancelTicket