import { Router } from 'express'
import * as controllerUser from '../controllers/user'
import * as controllerCatalog from '../controllers/catalogs'
import * as middlewareUser from '../middleware'

const router = Router()

// Usuário
router.post('/login', controllerUser.login, )
router.post('/register', controllerUser.register)
router.get('/checkauth', middlewareUser.validateToken, controllerUser.checkAuth)

// Catálogo
router.post('/create-catalog', middlewareUser.validateToken, controllerCatalog.createCatalog )
export { router }