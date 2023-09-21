const mongoose = require('mongoose')

const BookShema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    guests:{
        type:Number,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

const Reservation = mongoose.model('Reservation',BookShema)
module.exports = Reservation