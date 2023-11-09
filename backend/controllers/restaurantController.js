const { Restaurant: RestaurantModel } = require('../models/Restaurant')
const { User: UserModel } = require('../models/User')
const connect = require('../db/connection')

const restaurantController = {
  create: async (req, res) => {
    try {
      await connect()

      const restaurant = {
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
        address: req.body.address,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        price_range: req.body.price_range
      }

      const response = await RestaurantModel.create(restaurant)

      res.status(201).json({ response, msg: 'Restaurant created successfully' })
    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (req, res) => {
    try {
      await connect()

      const restaurants = await RestaurantModel.find({})

      res.status(200).json({ restaurants })
    } catch (error) {
      console.log(error)
    }
  },
  get: async (req, res) => {
    try {
      await connect()

      const restaurant = await RestaurantModel.findById(req.params.id)

      if (!restaurant) {
        res.status(404).json({ msg: 'Restaurant not found' })
        return
      }

      res.status(200).json({ restaurant })
    } catch (error) {
      console.log(error)
    }
  },

  delete: async (req, res) => {
    try {
      await connect()

      const restaurant = await RestaurantModel.findById(req.params.id)

      if (!restaurant) {
        res.status(404).json({ msg: 'Restaurant not found' })
        return
      }

      const users = await UserModel.find({ visited_restaurants: restaurant })

      for (const user of users) {
        user.visited_restaurants.pull(restaurant)
        await user.save()
      }

      const deletedRestaurant = await RestaurantModel.findByIdAndDelete(req.params.id)

      res.status(200).json({ deletedRestaurant, msg: 'Restaurant deleted successfully' })
    } catch (error) {
      console.log(error)
    }
  },

  update: async (req, res) => {
    try {
      await connect()

      const id = req.params.id

      const restaurant = {
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
        address: req.body.address,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        price_range: req.body.price_range
      }

      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id, restaurant)

      if (!updatedRestaurant) {
        res.status(404).json({ msg: 'Restaurant not found' })
        return
      }

      res.status(200).json({ updatedRestaurant, msg: 'Restaurant updated successfully' })
    } catch (error) {
      console.log(error)
    }
  },

  add_evaluation: async (req, res) => {
    try {
      await connect()

      const id_restaurant = req.params.id

      const evaluation = {
        id_evaluation: req.body.id_evaluation
      }

      const restaurant = await RestaurantModel.findById(id_restaurant)

      if (!restaurant) {
        res.status(404).json({ msg: 'Restaurant not found' })
        return
      }

      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id_restaurant, { $push: { evaluations: evaluation } }, { new: true })

      res.status(200).json({ updatedRestaurant, msg: 'Evaluation added successfully' })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = restaurantController
