const authService = require('../service/authService')
const Reservation = require('../models/Reservation')

exports.getBookedPage = (req,res)=>{
    
    res.render('book')
}
exports.postBookedPage = async (req,res)=>{
    const user = await authService.getUserbyUsername(req.user.username)
    const userId = user._id
    const {name,guests , phone , date,time} = req.body
    try{
        let book = new Reservation({name,guests , phone , date,time , owner: userId})
        await book.save()
    }catch(error){
        const errors = Object.keys(error.errors).map(key => error.errors[key].message)

    return res.render('book',{error: errors[0]})
    }

res.redirect('/')
}