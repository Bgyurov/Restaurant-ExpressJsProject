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
   
    // const bookReview = await Book.findById(req.params.bookId).lean()
    
    // let isOwner = false
    // let isWished = false
    // if(req.isAuthenticated){
    //     const bookReviewOwner = bookReview.owner
    //     const existingUser = await authService.getUserbyUsername(req.user.username)
      
    //     const userId = existingUser._id
    //     const wishList = bookReview.wishingList
        

    //     if(String(userId) == String(bookReviewOwner)){
        
    //         isOwner = true
    //     }
    //     // additional functional 
    //     //  const wished = wishList.find(item => item.equals(userId))
    //     // if(wished){
    //     //     isWished = true
    //     // }

    // }

    // if(!bookReview){
    //   return res.redirect('/404')
    // }
    

    res.render('crud/details')

}
// addition func for add functionality
// exports.getWish = async(req,res)=>{
//     const existingUser = await authService.getUserbyUsername(req.user.username)
//     const userId = existingUser._id
//     const bookId = req.params.bookId
//     await BookService.wishes(userId,bookId)
//     console.log('inside');

//     res.redirect(`/details/${req.params.bookId}`);
// }

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