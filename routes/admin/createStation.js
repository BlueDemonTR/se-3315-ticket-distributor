import { Seat, Station, Ticket, User } from '../../models'
import { authorize, escapeString } from '../../lib'

async function createStation(req, res, id) {
  const { body } = req,
    { name } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const station = await Station.create({
    name,
    deleted: false
  })

  return res.send({ station })
}

export default createStation