import { Router } from 'express'
import * as controllerUser from '../controllers/user'
import * as controllerCatalog from '../controllers/catalogs'
import * as controllerBooks from '../controllers/books'
import * as controllerTimeline from '../controllers/timeline'
import * as middlewareUser from '../middleware'

const router = Router()

// Usuário
router.post('/login', controllerUser.login, )
router.post('/register', controllerUser.register)
router.get('/checkauth', middlewareUser.validateToken, controllerUser.checkAuth)
router.get('/get-user', middlewareUser.validateToken, controllerUser.getUser )

// Catálogo
router.post('/create-catalog', middlewareUser.validateToken, controllerCatalog.createCatalog )
router.get('/get-catalog', middlewareUser.validateToken, controllerCatalog.getCatalog )
router.get('/get-catalog-and-books', middlewareUser.validateToken, controllerCatalog.getCatalogAndBooks )

// Livros
router.post('/add-book', middlewareUser.validateToken, controllerBooks.addBook )
router.get('/get-book/:bookId', controllerBooks.getBook)

// Cronogrâma

router.post('/create-timeline', middlewareUser.validateToken, controllerTimeline.createTimeline)
export { router }