const {Restaurant: RestaurantModel} = require('../models/Restaurant');

const restaurantController = {
 create: async (req, res) => {
  try {
    const restaurant ={
      name: req.body.name,
      desc : req.body.description,
      image: req.body.image,
      address: req.body.address,
      cuisine: req.body.cuisine,
      price_range: req.body.price_range,
    }

    const response = await RestaurantModel.create(restaurant);

    res.status(201).json({response, msg: 'Restaurant created successfully'});
  } catch (error) {
    console.log(error);
  }
 },

 getAll: async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});

    res.status(200).json({restaurants});
  } catch (error) {
    console.log(error);
  }
 },
 get: async(req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);

    res.status(200).json({restaurant});
  } catch (error) {
    console.log(error);
  }
 }
}   

module.exports = restaurantController;