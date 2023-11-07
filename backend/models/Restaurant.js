const mongoose = require('mongoose');
const { evaluationSchema } = require('./Evaluation');
const { userSchema } = require("./User");


const { Schema } = mongoose;

const restaurantSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
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
    required: false,
  },
  price_range:  {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant, restaurantSchema };
