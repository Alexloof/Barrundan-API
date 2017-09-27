import { listAllUsers, createUser } from '../controllers/users_controller'

const routes = app => {
  // todoList Routes
  app
    .route('/user')
    .get(listAllUsers)
    .post(createUser)
}

export default routes
