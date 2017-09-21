import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from '../routes/routes'

const app = express()
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
app.use(bodyParser.urlencoded({ extended: false })) // true kanske?

// Routes
app.use('/', routes)

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

export default app
