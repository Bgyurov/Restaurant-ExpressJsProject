const router = require('express').Router()
const authService = require('../service/authService')
const Review = require('../models/Review')

router.get('/contactus', async (req,res)=>{
    let noaccess = false
    if(req.user.id !== undefined){
        let ownerId = req.user.id
        let reservations = await Review.find({owner: ownerId}).lean()
        console.log(reservations)
        if(reservations.length > 0){
            
            noaccess = true
        }

    }
    console.log(noaccess)
    res.render('auth/contact' , {noaccess})
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
    const {username,email ,profileImage, password , repeatPassword} = req.body

    if(password !== repeatPassword){
        
        return res.render('auth/register',{error: 'Password Missmatch'})
    }
    const existingEmail = await authService.getUserbyEmail(email)
   if(existingEmail){
    console.log('email exist')
    return res.render('auth/register',{error: 'Email already exist'})
   }


    try {
        const user = await authService.register(username , profileImage, email , password)
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