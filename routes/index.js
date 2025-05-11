var express = require('express');
const { default: login } = require('./login');
const { default: signup } = require('./signup');
const { verify } = require('jsonwebtoken');
const { default: insertListing } = require('./insertListing');
import config from '../config'
import adminLogin from './login';

var router = express.Router();

const connectionObject = {
	"GET": {
	},
	"POST": {
		"/adminLogin": adminLogin
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
	
	const url = req.params[0]

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
      const token = req.headers.authorization

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

router.use('*', function(req, res, next) {
  handleMessage(req, res)
});

module.exports = router;
