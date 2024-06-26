const authService = require('../service/authService')
const Reservation = require('../models/Reservation')
exports.getProfile = async(req,res)=>{
    let moreReservations = false
    const user = await authService.getUserbyUsername(req.user.username)
    let profileImage = user.profileImage
    let userEmail = user.email
    let userUsername = user.username
    let owner = req.params.profileId
    let reservations = await Reservation.find({owner}).lean()
    
    res.render('profile',{userUsername,userEmail,profileImage,reservations})
}
