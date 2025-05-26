import { Seat, Station, Ticket, Train, User } from '../../models'
import { authorize, escapeString } from '../../lib'

async function cancelTicket(req, res, id) {
  const { body } = req,
    { ticketId } = body

  if (!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Ticket.findByIdAndUpdate(ticketId, { deleted: true })
  
  

  return res.send(true)
}

export default cancelTicket