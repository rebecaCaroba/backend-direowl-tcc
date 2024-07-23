import { Router } from 'express'
import * as controllerUser from '../controllers/user'
import * as controllerCatalog from '../controllers/catalogs'
import * as controllerBooks from '../controllers/books'
import * as middlewareUser from '../middleware'

const router = Router()

// Usuário
router.post('/login', controllerUser.login, )
router.post('/register', controllerUser.register)
router.get('/checkauth', middlewareUser.validateToken, controllerUser.checkAuth)

// Catálogo
router.post('/create-catalog', middlewareUser.validateToken, controllerCatalog.createCatalog )
router.get('/get-catalog', middlewareUser.validateToken, controllerCatalog.getCatalog )

// Livros

router.post('/add-book', middlewareUser.validateToken, controllerBooks.addBook )
export { router }