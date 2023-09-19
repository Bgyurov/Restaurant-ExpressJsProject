const mongoose = require('mongoose')

const MealShema = new mongoose.Schema({
    type : {
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
        match: [/^https?:\/\//i ,'Image link doesnt start with http:// or https://']
    },
    price : {
        type:Number,
        required: true,
    },
    weight:{
        type:Number,
        required: true,
    },
    description:{
        type:String,
        required: true
    }
})

const Meal = mongoose.model('Meal',MealShema)

module.exports = Meal