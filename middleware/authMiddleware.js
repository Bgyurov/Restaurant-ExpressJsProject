const jwt = require('../lib/jsonwebToken')


exports.authentication = async (req,res,next)=>{
    const token = req.cookies['mycookie']
    
    if(token){
        try {
         const decodedToken = await jwt.verify(token,'THISISSECRETFORPROJECT')  
        
         req.user = decodedToken
         req.isAuthenticated = true
         res.locals.id = decodedToken.id
         res.locals.username = decodedToken.username
         res.locals.profileImage = decodedToken.profileImage
         res.locals.isAdmin = decodedToken.isAdmin
        res.locals.isAuthenticated = true
        } catch (error) {
            console.log(error.message)
            res.clearCookie('mycookie')
            res.redirect('/404')
        }
    }

    next()
}

exports.isAuthenticated = (req,res,next) =>{
    if(!req.isAuthenticated){
        return res.redirect('/login')
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(!req.user.isAdmin){
        return res.redirect('/noaccess')
    }
    next()
}