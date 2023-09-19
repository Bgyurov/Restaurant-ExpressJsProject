//model ot thing
const Meal = require('../models/Meal')


// CRUD OPERATION FOR MODEL
exports.getOne = (thingId) => Meal.findById(thingId)

exports.update = (thingId,data) => Meal.findByIdAndUpdate(thingId,data, {runValidators: true})

exports.delete = (thingId) => Meal.findByIdAndDelete(thingId)

exports.orders = async (userId, mealId) => {

    const meal = await Meal.findById(mealId);

    meal.orderList.push(userId)

    return meal.save();
}


exports.getOrders = async (userId) => {
    const allMeals = await Meal.find({}).lean();
    const meals = [];

    function findUserId(meal) {

        if (meal.orderList?.some((id) => id == userId)){
            meals.push(meal);
        }

    }

    allMeals.forEach(findUserId);

    return meals
}


    