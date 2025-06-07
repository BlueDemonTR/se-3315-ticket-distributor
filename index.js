import config from './config';
import express, { Router } from 'express';
import { fork } from 'child_process'

const app = express();
const router = Router();
var cors = require('cors')
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import { promises } from 'fs';
var indexRouter = require('./routes/index');

const port = 38215
const path = __dirname + '/web/build/';

const corsSettings = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

app.use(bodyParser.json())
app.use(cors(corsSettings))

async function startDatabase() {

  await connect(process.env.DB_URI, {})
  console.log('connected to database')
}

startDatabase()

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

process.on('uncaughtException', function (err) {
  console.log('bepis', err)
  const path = `crashes\\crashlog-${new Date().toISOString().replaceAll(':', '-')}.log`
  try {
    promises.writeFile(
      path, 
      JSON.stringify({
        cause: err.cause,
        message: err.message,
        name: err.name,
        stack: err.stack
      })
    ).then(() => console.log('crashlog created at ' + path))
  } catch (e) {
    console.log("Couldn't create crash log")
    console.log(e)
  }
});

app.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

app.use('/api', indexRouter);