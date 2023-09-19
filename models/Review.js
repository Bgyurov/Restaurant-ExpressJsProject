const mongoose = require('mongoose')

const ReviewShema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    },
    rating:{
        type:String,
        required: true,
    },
    review:{
        type:String,
        required: true,
    },
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
})

const Review = mongoose.model('Review',ReviewShema)

module.exports = Review