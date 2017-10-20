import passport from 'passport'
import { validator } from '../helpers/requestValidator'
import {
  listAllUsers,
  createUser,
  createUserReqeustSchema,
  registerForPush,
  registerForPushReqeustSchema,
  sendPushToAllUsersReqeustSchema,
  sendPushToAllUsers
} from '../controllers/users_controller'
import {
  fetchBarrunda,
  addUserToBarrunda,
  fetchBarrundaParticipants,
  createBarrunda,
  addUserToBarrundaRequestSchema,
  fetchCurrentBar
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

  // Register user for push
  router.post(
    '/user/pushtoken',
    passport.authenticate('jwt', { session: false }),
    validator(registerForPushReqeustSchema),
    asyncMiddleware(registerForPush)
  )

  // Send push to all users
  router.post(
    '/user/sendpush/all',
    validator(sendPushToAllUsersReqeustSchema),
    asyncMiddleware(sendPushToAllUsers)
  )

  // Bar routes
  router.get(
    '/barrunda',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchBarrunda)
  )

  router.post(
    '/barrunda/participants',
    validator(addUserToBarrundaRequestSchema),
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(addUserToBarrunda)
  )

  router.get(
    '/barrunda/participants/:barrundaId',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchBarrundaParticipants)
  )

  router.get(
    '/barrunda/bar/:barrundaId',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(fetchCurrentBar)
  )
}

export default routes
