import { config } from 'dotenv';
import express, { Router } from 'express';
import { fork } from 'child_process'
const app = express();
const router = Router();
var cors = require('cors')
import { connect } from 'mongoose';
import bodyParser from 'body-parser';

const port = 38215

config()

const corsSettings = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

app.use(bodyParser.json())
app.use(cors(corsSettings))


async function startDatabase() {
  console.log('************************************************************')
  console.log('CONNECTING TO: ', process.env.DB_URI)
  console.log('************************************************************')

  await connect(process.env.DB_URI, {})
  console.log('connected to database')
}

startDatabase()

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})