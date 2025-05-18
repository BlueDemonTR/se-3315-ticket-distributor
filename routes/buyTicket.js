import { Seat, Ticket, User } from '../models'
import { escapeString } from '../lib'

async function buyTicket(req, res, id) {
  const { body } = req,
    { train, number, name, email, phone } = body

  const query = { train, number }
  const seat = await Seat
    .findOne(query)

  if(!seat) {
    res.send("Invalid Seat", 400)
    return
  }

  const exists = await Ticket
    .findOne({ seat })

  if(exists) {
    res.send("Seat Taken", 400)
    return
  }

  let user = await User.findOne({ name })

  if(!user) {
    user = await User.create({
      name,
      email,
      phone
    })
  }

  const ticket = await Ticket.create({
    owner: user,
    seat: seat
  })

  return res.send({ ticket })
}

export default buyTicket