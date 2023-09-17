exports.getHomePage =  (req,res)=>{
    
    res.render('home')
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

exports.getCatalogPage = async (req,res)=>{
    let bookReviews = await Book.find().lean()
    res.render('catalog',{bookReviews})
}