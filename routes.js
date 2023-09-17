const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const bookController = require('./controllers/bookController')

const crudController = require('./controllers/crudController')
const {isAuthenticated} = require('./middleware/authMiddleware')

//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)
router.get('/about',homeController.getAboutPage)
router.get('/gallery',homeController.getGallaryPage)
router.get('/create',crudController.getCreatePage)
router.get('/edit',crudController.getEditPage)
router.get('/details',crudController.getDetailsPage)


router.get('/menu',homeController.getMenuPage)
router.get('/book',bookController.getBookedPage)

router.use('*',homeController.getErrorPage)

module.exports = router