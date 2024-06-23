import { Router } from 'express'
import * as controllerUser from '../controllers/user'
import * as middlewareUser from '../middleware'

const router = Router()

router.post('/login', controllerUser.login, )
router.post('/register', controllerUser.register)
router.get('/checkauth', middlewareUser.validateToken, controllerUser.checkAuth)
export { router }