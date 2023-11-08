const mongoose = require('mongoose');
const { evaluationSchema } = require('./Evaluation');
const { userSchema } = require("./User");


const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name:  {
    type: String,
    required: true,
  },
  desc:  {
    type: String,
    required: false,
  },
  image:  {
    type: String,
    required: false,
  },
  address:  {
    type: String,
    required: true,
  },
  cuisine:  {
    type: String,
    required: true,
  },
  rating:  {
    type: Number,
    required: true,
  },
  price_range:  {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant, restaurantSchema };
