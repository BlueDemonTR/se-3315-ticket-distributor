import { Seat, Station, Ticket, Train, User } from '../../models'
import { escapeString } from '../../lib'

async function deleteTrain(req, res, id) {
  const { body } = req,
    { id } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Train.findByIdAndUpdate(id, { deleted: true })

  return res.send(true)
}

export default deleteTrain