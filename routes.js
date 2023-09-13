const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const {isAuthenticated} = require('./middleware/authMiddleware')

//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)
router.use('*',homeController.getErrorPage)

module.exports = router