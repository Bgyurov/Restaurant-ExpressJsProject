
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const setupViewEngine = require('./config/viewEngine')
const initDatabase = require('./config/dataBaseInit')
const authMiddleware = require('./middleware/authMiddleware')
const app = express()
setupViewEngine(app)


app.use(cookieParser())
app.use(express.static('static'))
app.use(express.urlencoded({extended: false}))
app.use(authMiddleware.authentication)
app.use(router)




initDatabase()
.then(() => app.listen(5000, ()=> console.log('Server is running on port 5000')))
.catch((err) => console.error(err))
