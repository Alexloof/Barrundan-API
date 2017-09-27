const routes = app => {
  const todoList = require('../controllers/todoListController')

  // todoList Routes
  app
    .route('/tasks')
    .get(todoList.listAllTasks)
    .post(todoList.createTask)
}

export default routes
