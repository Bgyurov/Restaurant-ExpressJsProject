//model ot thing
const Meal = require('../models/Meal')


// CRUD OPERATION FOR MODEL
exports.getOne = (thingId) => Meal.findById(thingId)

exports.update = (thingId,data) => Meal.findByIdAndUpdate(thingId,data, {runValidators: true})

exports.delete = (thingId) => Meal.findByIdAndDelete(thingId)


    