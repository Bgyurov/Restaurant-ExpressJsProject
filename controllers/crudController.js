const authService = require('../service/authService')
const Meal = require('../models/Meal')
const MealService = require('../service/MealService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyUsername(req.user.username)
        const userId = user._id
        const {type,name , image , price,weight ,description} = req.body
        try{
            let meal = new Meal({type,name , image , price,weight ,description, owner: userId})
            await meal.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/menu')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const mealReview = await Meal.findById(req.params.mealId).lean()
    
    let isOwner = false
    let isOrdered = false
    if(req.isAuthenticated){
        const mealReviewOwner = mealReview.owner
        const existingUser = await authService.getUserbyUsername(req.user.username)
      
        const userId = existingUser._id
        const orderList = mealReview.orderList
      

        if(String(userId) == String(mealReviewOwner)){
        
            isOwner = true
        }
      
         const ordered = orderList.find(item => item.equals(userId))
        if(ordered){
            isOrdered = true
        }

    }

    if(!mealReview){
      return res.redirect('/404')
    }
    
    console.log(isOwner)
    res.render('crud/details',{isOwner,mealReview,isOrdered})

}

exports.getOrder = async(req,res)=>{
    const existingUser = await authService.getUserbyUsername(req.user.username)
    const userId = existingUser._id
    const mealId = req.params.mealId
    await MealService.orders(userId,mealId)
    console.log('inside');

    res.redirect(`/details/${req.params.mealId}`);
}

exports.getEditPage = async(req,res)=>{
    // const bookId = req.params.bookId
    // const bookReview = await BookService.getOne(bookId).lean()
    res.render('crud/edit')
}
exports.postEditPage = async(req,res)=>{
const bookId = req.params.bookId
const {title , author,genre,stars,image,review} = req.body

try {
    await BookService.update(bookId ,{title , author,genre,stars,image,review} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${bookId}`)
}

exports.getDelete = async(req,res)=>{
const bookId = req.params.bookId
await BookService.delete(bookId)

res.redirect('/catalog')
}