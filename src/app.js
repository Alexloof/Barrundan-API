import express, { Router } from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import config from './config'
import { jwt_strategy } from './config/jwt'
import routes from './routes/routes'
import {startCreateBarrundCronJob} from './cron/createBarrunda'
import {createPushCronJobs} from './cron/pushJobs'

const app = express()

// Add jwt stratergy
passport.use(jwt_strategy)
app.use(passport.initialize())

const router = new Router()

// Mongoose's built in promise library is deprecated, replaced with ES2015 Promise
mongoose.Promise = global.Promise

mongoose.connect(config.db_url, {
  keepAlive: true,
  reconnectTries: 4,
  useMongoClient: true
})

mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

app.use((req, res, next) => {
  res.header('X-powered-by', 'Inconceivable amounts of Beer')
  next()
})

// Middleware
app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test'
  })
)
app.use(bodyParser.json())

// Routes
routes(router)

app.use(router)

// Handle Errors
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.code >= 100 && err.code < 600 ? err.code : 500).send({
    error: err.code >= 100 && err.code < 600 ? err.code : 500,
    message: err.message
  })
})
// Handle 404
app.use(function(req, res, next) {
  res.status(404).send({
    error: 404,
    message: 'These are not the droids you are looking for'
  })
})

//createPushCronJobs();

export default app
