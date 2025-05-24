var express = require('express');
const { verify } = require('jsonwebtoken');
import config from '../config'
import buyTicket from './buyTicket';
import cancelTicket from './admin/cancelTicket';
import createStation from './admin/createStation';
import getAvailability from './getAvailability';
import getSeats from './getSeats';
import getStations from './getStations';
import getTicket from './getTicket';
import getTrains from './getTrains';
import adminLogin from './login';
import createTrain from './admin/createTrain';
import deleteStation from './admin/deleteStation';
import deleteTrain from './admin/deleteTrain';

var router = express.Router();

const connectionObject = {
	"GET": {
		"/test": async (req, res, id) => {
			res.send("hello")
		}
	},
	"POST": {
		"/adminLogin": adminLogin,
		"/getStations": getStations,
		"/getSeats": getSeats,
		"/getTrains": getTrains,
		"/getAvailability": getAvailability,
		"/buyTicket": buyTicket,
		"/getTicket": getTicket,
		
		"/admin/cancelTicket": cancelTicket,
		"/admin/createStation": createStation,
		"/admin/createTrain": createTrain,
		"/admin/deleteStation": deleteStation,
		"/admin/deleteTrain": deleteTrain,
	}
}

function handleSend(data, status = 200) {
  this.status(status)

	this.write(JSON.stringify(data))
	this.end()
}

function handleMessage(req, res) {
	const method = connectionObject[req.method]

	if(!method) {
    res.status(400)
		res.write("Invalid Method " + req.method)

		res.end()
		return
	}
	
	const url = `${req.params.splat.reduce((prev, curr) => prev + "/" + curr, "")}`

	const func = method[url]
	
	if(!func) {
    res.status(400)
		res.write(JSON.stringify(
			{ err: "Invalid Function " + url + " in " + req.method }
		))
		res.end()
		return
	}

	let id

	if(req?.headers?.authorization) {
		try {
      const token = req.headers.authorization.slice(7)

			id = verify(
				token, 
				config.JWT_SECRET
			).data
		} catch (error) {

      res.status(401)
			res.write('Token Expired')
			
			res.end()
			return
		}
	}

	res.send = handleSend

	func(req, res, id)
}

router.use('/*splat', function(req, res, next) {
  handleMessage(req, res)
});

module.exports = router;
