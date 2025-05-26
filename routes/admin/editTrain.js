import { Seat, Station, Ticket, Train, User } from '../../models'
import { authorize, escapeString } from '../../lib'

async function editTrain(req, res, id) {
  const { body } = req,
    { _id, name, from, to, departure, duration, ticketPrice, seatNames = [] } = body

  console.log('hello?')

  if(!authorize(id)) {
    res.send("Unauthorized", 400)
    return
  }

  const newTrain = await Train.findByIdAndUpdate(
    _id,
    {
      name, 
      from, 
      to, 
      departure, 
      duration, 
      ticketPrice
    },
    { new: true }
  )

  await Seat.updateMany({
    train: _id
  }, {
    deleted: true
  })

  const seats = await Promise.all(
    seatNames.map(item => Seat.create({
      train: _id,
      number: item
    }))
  )

  return res.send({ train: newTrain, seats })
}

export default editTrain