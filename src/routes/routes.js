import { listAllUsers, createUser } from '../controllers/users_controller'
import { sendBarrunda, setBarrunda } from '../controllers/barrunda_controller'

/* Använd asyncMiddleware om controllern är async */
import asyncMiddleware from '../helpers/asyncMiddleware'

const routes = app => {
  // User Routes
  app
    .route('/user')
    .get(listAllUsers)
    .post(asyncMiddleware(createUser))

  // Barrunda routes
  app
    .route('/api/barrunda')
    .get(asyncMiddleware(sendBarrunda))
    .post(asyncMiddleware(setBarrunda))
}

export default routes
