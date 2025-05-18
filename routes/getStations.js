import { Station } from '../models'
import { escapeString } from '../lib'

async function getStations(req, res, id) {
  const { body } = req,
    { name, skip = 0 } = body

  const query = {}

  if(name) query.name = new RegExp(escapeString(name), 'i')

  const stations = await Station
    .find(query)
    .sort('name')
    .skip(skip)
    .limit(20)

  return res.send({ stations })
}

export default getStations