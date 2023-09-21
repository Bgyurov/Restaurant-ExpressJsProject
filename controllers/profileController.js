const authService = require('../service/authService')
const Reservation = require('../models/Reservation')
exports.getProfile = async(req,res)=>{
    const user = await authService.getUserbyUsername(req.user.username)
    let userEmail = user.email
    let userUsername = user.username
    let owner = req.params.profileId
    const books = await Reservation.find({owner}).lean()
    console.log(books)
    
    res.render('profile',{userUsername,userEmail,books})
}
