import passport from 'passport'
import { validator } from '../helpers/requestValidator'
import {
  listAllUsers,
  createUser,
  createUserReqeustSchema
} from '../controllers/users_controller'
import {
  fetchBarrunda,
  addUserToBarrunda,
  fetchBarrundaParticipants,
  createBarrunda,
  addUserToBarrundaRequestSchema
} from '../controllers/barrunda_controller'

/* Använd asyncMiddleware om controllern är async */
import asyncMiddleware from '../helpers/asyncMiddleware'

const routes = router => {
  // add passport.authenticate('jwt', { session: false }) for Authorization

  // User Routes
  router.post(
    '/users',
    validator(createUserReqeustSchema),
    asyncMiddleware(createUser)
  )

  router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(listAllUsers)
  )

  // Barrunda routes

  //för att testa göra barrundor
  router.post('/barrunda', asyncMiddleware(createBarrunda))

  router.get(
    '/barrunda',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchBarrunda)
  )

  router.put(
    '/barrunda/participants',
    validator(addUserToBarrundaRequestSchema),
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
