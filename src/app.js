import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import db from './config/db'
import routes from './routes/routes'

const app = express()

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise

mongoose.connect(db.url)

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
app.use(bodyParser.urlencoded({ extended: true })) // true kanske?

// Routes
routes(app)

// 404 => Error handler
app.use((req, res, next) => {
  const err = new Error('These are not the droids you are looking for')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.status,
    message: err.message
  })
})
// CORS setup?
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
    return res.status(200).json({})
  }
})

export default app
