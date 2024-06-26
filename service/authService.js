const User = require('../models/User')
const Reservation = require('../models/Reservation')

const jwt = require('../lib/jsonwebToken')
const AppError = require('../utils/AppError')

exports.getUserbyEmail = async(email) => {
    const user = await User.findOne({email})

    return user
}

exports.getUserbyUsername = async(username) => {
    const user = await User.findOne({username})

    return user
}

exports.register = (username,profileImage ,  email,password)=>{
    return User.create({username ,profileImage,email,password})
}
exports.login = async(email , password)=>{

    const user = await this.getUserbyEmail(email)
    if(!user){
        throw new AppError('Email or Password is incorrect.',{user})
    }
    const isValid = await user.comparePassword(password)
    if(!isValid){
        throw new AppError('Email or Password is incorrect.')
    }
    const payload = {username: user.username , id: user._id , profileImage: user.profileImage, isAdmin: user.isAdmin}
    const token = await jwt.sign(payload,'THISISSECRETFORPROJECT', {expiresIn: '2h'})

    return token
}
