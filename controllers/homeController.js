const Review = require('../models/Review')

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
exports.getMenuPage =  (req,res)=>{
    
    res.render('menu')
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

