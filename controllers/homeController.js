const Review = require('../models/Review')
const Meal = require('../models/Meal')

exports.getHomePage = async (req,res)=>{
    let comments = await Review.find().lean()
    comments = comments.slice(0,3)
    res.render('home',{comments})
}
exports.getAboutPage =  (req,res)=>{
    
    res.render('about')
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

