import { Seat, Station, Ticket, Train, User } from '../../models'
import { escapeString } from '../../lib'

async function deleteStation(req, res, id) {
  const { body } = req,
    { id } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Station.findByIdAndUpdate(id, { deleted: true })

  return res.send(true)
}

export default deleteStation