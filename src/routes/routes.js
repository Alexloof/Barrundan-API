import { listAllUsers, createUser } from '../controllers/users_controller'
import {
  fetchBarrunda,
  addUserToBarrunda,
  fetchBarrundaParticipants,
  createBarrunda
} from '../controllers/barrunda_controller'
import passport from 'passport'

/* Använd asyncMiddleware om controllern är async */
import asyncMiddleware from '../helpers/asyncMiddleware'

const routes = router => {
  // add passport.authenticate('jwt', { session: false }) for Authorization
  // add header in request Authorization: Bearer <token>

  // User Routes
  router.post('/users', asyncMiddleware(createUser))

  router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(listAllUsers)
  )

  // Bar routes

  //för att testa göra barrundor
  router.post('/barrunda', asyncMiddleware(createBarrunda))

  router.get(
    '/barrunda',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchBarrunda)
  )

  router.post(
    '/barrunda/participants',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(addUserToBarrunda)
  )

  router.get(
    '/barrunda/participants',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchBarrundaParticipants)
  )
}

export default routes
