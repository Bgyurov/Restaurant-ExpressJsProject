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


router.get('/createmeal',crudController.getCreatePage)
router.post('/createmeal',crudController.postCreatePage)

router.get('/details/:mealId',crudController.getDetailsPage)
router.get('/order/:mealId',crudController.getOrder)

router.get('/edit/:mealId',crudController.getEditPage)
router.post('/edit/:mealId',crudController.postEditPage)

router.get('/delete/:mealId',crudController.getDelete)

router.get('/menu',homeController.getMenuPage)
router.get('/book',bookController.getBookedPage)

router.use('*',homeController.getErrorPage)

module.exports = router