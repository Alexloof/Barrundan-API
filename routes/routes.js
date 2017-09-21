import { Router } from 'express'
import { barrundan } from '../controllers/example_controller'

const routes = Router()

routes.get('/', barrundan)

export default routes
