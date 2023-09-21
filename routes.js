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


router.get('/createmeal',isAuthenticated,crudController.getCreatePage)
router.post('/createmeal',isAuthenticated,crudController.postCreatePage)

router.get('/details/:mealId',crudController.getDetailsPage)
router.get('/order/:mealId',isAuthenticated,crudController.getOrder)

router.get('/edit/:mealId',isAuthenticated,crudController.getEditPage)
router.post('/edit/:mealId',isAuthenticated,crudController.postEditPage)

router.get('/delete/:mealId',isAuthenticated,crudController.getDelete)

router.get('/menu',homeController.getMenuPage)
router.get('/book',isAuthenticated,bookController.getBookedPage)
router.post('/book',isAuthenticated,bookController.postBookedPage)


router.use('*',homeController.getErrorPage)

module.exports = router