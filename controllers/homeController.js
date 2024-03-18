const Review = require('../models/Review')
const Meal = require('../models/Meal')
const User = require('../models/User.js')

exports.getHomePage = async (req,res)=>{

   
    res.render('home')
}
exports.getAboutPage = async (req,res)=>{
    let comments = await Review.find().lean()
    for (let comment of comments) {
        // Find the user who made the review
        let user = await User.findById(comment.owner).lean();
        if (user) {
            // Add user profile image to the comment object
            comment.userProfileImage = user.profileImage; // Assuming profileImage is the field containing profile picture
        }
    }

    res.render('about' , {comments})
}
exports.getGallaryPage =  (req,res)=>{
    
    res.render('gallary')
}
exports.getMenuPage = async (req,res)=>{
    let meals = await Meal.find().lean()
    meals = meals.slice(0,5)
    res.render('menu',{meals})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}
exports.getAccessPage = (req,res)=>{
    res.render('noaccess')
}

