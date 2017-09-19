import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.send({ title: 'Barrundan API' })
})

export default routes
