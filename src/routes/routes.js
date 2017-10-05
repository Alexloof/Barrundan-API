import { listAllUsers, createUser } from '../controllers/users_controller'
import { sendBarrunda, setBarrunda } from '../controllers/barrunda_controller'
import passport from 'passport'

/* Använd asyncMiddleware om controllern är async */
import asyncMiddleware from '../helpers/asyncMiddleware'

const routes = router => {

    // add passport.authenticate('jwt', { session: false }) for Authorization
    // add header in request Authorization: Bearer <token>

    // User Routes
    router.post('/user', asyncMiddleware(createUser));

    // Bar routes
    router.get('/bars',passport.authenticate('jwt', { session: false }),asyncMiddleware(sendBarrunda))
}

export default routes
