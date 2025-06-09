import { Seat, Station, Ticket, Train, User } from '../../models'
import { authorize, escapeString } from '../../lib'
import { XMLBuilder } from 'fast-xml-parser'
import { isObjectIdOrHexString, Mongoose } from 'mongoose'
import { promises } from 'fs'

function normalize(databaseItem) {
	const obj = databaseItem.toObject()

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const element = obj[key]

			if(isObjectIdOrHexString(element)) {
				obj[key] = obj[key].toString()
			}
		}
	}

	return obj
}

async function createBackup(req, res, id) {

	if(!authorize(id)) {
		res.send("Unauthorized", 400)
		return
	}

	const builder = new XMLBuilder({
		arrayNodeName: "backup",
		
	})

	const notDeleted = { deleted: { $ne: true }}

	const [stations, trains, seats, tickets, users] = await Promise.all([
		Station.find(),
		Train.find(),
		Seat.find(),
		Ticket.find(notDeleted),
		User.find()
	])

	const backup = {
		stations: stations.map(x => normalize(x)),
		trains: trains.map(x => normalize(x)),
		tickets: tickets.map(x => normalize(x)),
		seats: seats.map(x => normalize(x)),
		users: users.map(x => normalize(x)),
	}

	const output = builder.build({ backup })

	const path = `backups\\backup-${new Date().toISOString().replaceAll(':', '-')}.xml` 

	await promises.writeFile(path, output)

	return res.send({ output })
}

export default createBackup