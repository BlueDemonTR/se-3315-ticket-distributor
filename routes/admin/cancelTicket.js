import { Seat, Station, Ticket, Train, User } from '../../models'
import { escapeString } from '../../lib'

async function cancelTicket(req, res, id) {
  const { body } = req,
    { id } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Ticket.findByIdAndDelete(id)

  return res.send(true)
}

export default cancelTicket