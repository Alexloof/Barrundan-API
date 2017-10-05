import express, {Router} from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import config from './config'
import {jwt_strategy} from './config/jwt'
import routes from './routes/routes'

const app = express()

// Add jwt stratergy
passport.use(jwt_strategy);
app.use(passport.initialize());

const router = new Router();

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise

mongoose.connect(config.db_url)

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

app.use(router);


app.use((err, req, res, next) => {
    /* Handle Errors */
    res.status(err.status).send({
        error: err.status,
        message: err.message
    });

});

app.use(function (req, res, next) {
    res.status(404).send('These are not the droids you are looking for')
})

// CORS setup?
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'>
//   )
//   if (req.method === 'Options') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
//     return res.status(200).json({})
//   }
// })

export default app
