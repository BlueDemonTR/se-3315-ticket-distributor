import { Seat, Ticket, User } from '../models'
import { escapeString } from '../lib'

async function buyTicket(req, res, id) {
  const { body } = req,
    { train, number, name, email, phone } = body

  const query = { train, number, deleted: { $ne: true } }
  const seat = await Seat
    .findOne(query)

  if(!seat) {
    res.send("Invalid Seat", 400)
    return
  }

  const exists = await Ticket
    .findOne({ seat, deleted: { $ne: true } })

  if(exists) {
    res.send("Seat Taken", 400)
    return
  }

  let user = await User.findOneAndUpdate({ name }, { email, phoneNumber: phone })

  if(!user) {
    user = await User.create({
      name,
      email,
      phoneNumber: phone
    })
  }

  const ticket = await Ticket.create({
    owner: user,
    seat: seat
  })

  return res.send({ ticket })
}

export default buyTicket