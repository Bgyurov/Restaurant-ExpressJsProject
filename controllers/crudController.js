const authService = require('../service/authService')
const Meal = require('../models/Meal')
const MealService = require('../service/MealService')

function generetePlatforms(platform) {

    const platforms = [
            {label : "Breakfast" , isSelected : false},
            {label : "Lunch", isSelected : false},
            {label : "Dinner", isSelected : false},
            {label : "Fast Food", isSelected : false},
            {label : "Gourmet", isSelected : false},

    ]
    const result = platforms.map(x => x.label === platform ? {...x,isSelected: true} : x)

    return result
    
}


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
    const mealId = req.params.mealId
    const mealReview = await MealService.getOne(mealId).lean()
    const platforms = generetePlatforms(mealReview.type)

    res.render('crud/edit',{mealReview,platforms})
}
exports.postEditPage = async(req,res)=>{
    const mealId = req.params.mealId
const {type,name , image , price,weight ,description} = req.body

try {
    await MealService.update(mealId ,{type,name , image , price,weight ,description} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${mealId}`)
}

exports.getDelete = async(req,res)=>{
const mealId = req.params.mealId
await MealService.delete(mealId)

res.redirect('/menu')
}