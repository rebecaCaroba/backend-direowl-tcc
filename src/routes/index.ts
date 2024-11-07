import { Router } from 'express'
import * as controllerUser from '../controllers/user'
import * as controllerCatalog from '../controllers/catalogs'
import * as controllerBooks from '../controllers/books'
import * as controllerSchedule from '../controllers/schedule'
import * as controllerNotes from '../controllers/notes'
import * as middlewareUser from '../middleware'
import * as middlewareBook from '../middleware/books'

const router = Router()

// Usuário
router.post('/login', controllerUser.login, )
router.post('/register', controllerUser.register)
router.get('/checkauth', middlewareUser.validateToken, controllerUser.checkAuth)
router.get('/get-user', middlewareUser.validateToken, controllerUser.getUser )
router.patch('/update-username', middlewareUser.validateToken, controllerUser.updateUser)
router.patch('/update-password', middlewareUser.validateToken, controllerUser.updatePassword)
router.delete('/delete-user', middlewareUser.validateToken, controllerUser.deleteUser)

// Catálogo
router.post('/create-catalog', middlewareUser.validateToken, controllerCatalog.createCatalog )
router.get('/get-catalog', middlewareUser.validateToken, controllerCatalog.getCatalog )
router.get('/get-catalog-and-books', middlewareUser.validateToken, controllerCatalog.getCatalogAndBooks )
router.get('/get-books-from-catalog/:catalogId', middlewareUser.validateToken, controllerCatalog.getBooksFromCatalog )
router.delete('/delete-catalog/:catalogId', middlewareUser.validateToken, controllerCatalog.deleteCatalog)


// Livros
router.post('/add-book', middlewareUser.validateToken, middlewareBook.verifyBook, controllerBooks.addBook )
router.get('/get-book/:bookId', controllerBooks.getBook)
router.delete('/delete-book/:bookId', controllerBooks.deleteBook)

// Cronogrâma
router.post('/create-schedule', middlewareUser.validateToken, controllerSchedule.createSchedule)
router.post('/create-dayRead', controllerSchedule.CreateDayRead)
router.get('/get-schedule/:bookId', middlewareUser.validateToken, controllerSchedule.getSchedule)
router.get('/get-all-schedule', middlewareUser.validateToken, controllerSchedule.getAllSchedule)
router.patch('/completed-day', middlewareUser.validateToken, controllerSchedule.completedDay)
router.put('/completed-schedule', middlewareUser.validateToken, controllerSchedule.completeSchedule)
router.post('/put-day-read', controllerCatalog.PutDayRead)
router.delete('/delete-schedule/:scheduleId', middlewareUser.validateToken, controllerSchedule.deleteSchedule)

// Notas
router.post('/add-notes', middlewareUser.validateToken, controllerNotes.addNotes)
router.get('/get-notes/:bookId', middlewareUser.validateToken, controllerNotes.getNotes)
router.delete('/delete-notes/:notesId', middlewareUser.validateToken, controllerNotes.deleteNotes)


export { router }