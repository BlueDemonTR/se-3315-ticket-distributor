import { Seat, Station, Ticket, Train, User } from '../../models'
import { authorize, escapeString } from '../../lib'

async function createTrain(req, res, id) {
  const { body } = req,
    { name, from, to, departure, duration, ticketPrice, seatNames = [] } = body

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const train = await Train.create({
    name, from, to, departure, duration, ticketPrice
  })

  const seats = Promise.all(
    seatNames.map(item => Seat.create({
      train,
      number: item
    }))
  )

  return res.send({ train, seats })
}

export default createTrain