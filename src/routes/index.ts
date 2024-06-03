import { Router } from 'express'
import * as controllerUser from '../controllers/user'

const router = Router()

router.post('/login', controllerUser.login)


export { router }