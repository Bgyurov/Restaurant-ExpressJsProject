const router = require('express').Router()
const authService = require('../service/authService')
const Review = require('../models/Review')

router.get('/contactus', (req,res)=>{
    res.render('auth/contact')
})

router.post('/contactus', async (req,res)=>{
    const user = await authService.getUserbyUsername(req.user.username)
    const userId = user._id
    const {name,rating,comment} = req.body
    try{
        let review = new Review({name,rating,comment, owner: userId})
        await review.save()
    }catch(error){
        const errors = Object.keys(error.errors).map(key => error.errors[key].message)
        
        return res.render('auth/contact',{error: errors[0]})
    }
    
    res.redirect('/')
   
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login', async (req,res)=>{
    const {email , password} = req.body

    try{
        const token = await authService.login(email,password)
        res.cookie('mycookie', token, {httpOnly: true})
    }catch(error){
        console.log(error.message);
       return res.render('auth/login' , {error: error.message})
    }
    res.redirect('/')
})




router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.post('/register', async (req, res,next)=>{
    const {username,email , password , repeatPassword} = req.body

    if(password !== repeatPassword){
        //throw new errror
        
        return res.render('auth/register',{error: 'Password Missmatch'})
    }
//verification for email
    const existingEmail = await authService.getUserbyEmail(email)
    // console.log(`Existing user - ${existingUser.username}` + ' '+ 'Email from form ' + email)
   if(existingEmail){
    console.log('email exist')
    return res.render('auth/register',{error: 'Email already exist'})
   }

   //verification for name 
//    const existingUser = await authService.getUserbyUsername(username)

//    if(existingUser){
//     console.log('username exist')
//     return res.render('auth/register')
//    }

    try {
        const user = await authService.register(username , email , password)
        const token = await authService.login(email,password)
        res.cookie('mycookie', token, {httpOnly: true})
    } catch (error) {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('auth/register',{error: errors[0]})
    }

    res.redirect('/')
})

router.get('/logout',(req,res)=>{

    res.clearCookie('mycookie')
    res.redirect('/')
  })
  


module.exports = router