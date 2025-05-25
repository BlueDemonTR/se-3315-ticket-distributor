import { Station, Train } from '../models'
import { escapeString } from '../lib'

async function getTrains(req, res, id) {
  const { body } = req,
    { 
      from, 
      to, 
      after = 0, 
      before, 
      durationMin = 0, 
      durationMax, 
      ticketPriceMin = 0, 
      ticketPriceMax 
    } = body

  const query = { 
    departure: { $gte: after }, 
    duration: { $gte: durationMin },
    ticketPrice: { $gte: ticketPriceMin },
    deleted: false
  }
  if(from) query.from = from
  if(to) query.to = to
  
  if(before) query.departure.$lte = before
  if(durationMax) query.duration.$lte = durationMax
  if(ticketPriceMax) query.duration.$lte = ticketPriceMax

  const trains = await Train
    .find(query)

  return res.send({ trains })
}

export default getTrains