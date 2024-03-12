const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const bookController = require('./controllers/bookController')
const profileController = require('./controllers/profileController')
const crudController = require('./controllers/crudController')
const {isAuthenticated , isAdmin} = require('./middleware/authMiddleware')

//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)
router.get('/about',homeController.getAboutPage)
router.get('/gallery',homeController.getGallaryPage)
router.get('/menu' , homeController.getMenuPage)


router.get('/createmeal',isAuthenticated ,isAdmin,crudController.getCreatePage)
router.post('/createmeal',isAuthenticated , isAdmin,crudController.postCreatePage)

router.get('/details/:mealId',crudController.getDetailsPage)
router.get('/order/:mealId',isAuthenticated,crudController.getOrder)

router.get('/edit/:mealId',isAuthenticated,crudController.getEditPage)
router.post('/edit/:mealId',isAuthenticated,crudController.postEditPage)

router.get('/delete/:mealId',isAuthenticated,crudController.getDelete)

router.get('/book',isAuthenticated,bookController.getBookedPage)
router.post('/book',isAuthenticated,bookController.postBookedPage)

router.get('/profile/:profileId',isAuthenticated,profileController.getProfile)


router.get('/noaccess' , homeController.getAccessPage)
router.use('*',homeController.getErrorPage)

module.exports = router