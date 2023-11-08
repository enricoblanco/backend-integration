const mongoose = require('mongoose');
const { restaurantSchema } = require('./Restaurant');

const {Schema} = mongoose;

const userSchema = new Schema({
  name : {
    type: String,
    required: true,
  },
  email :  {
    type: String,
    required: true,
  },
  password :  {
    type: String,
    required: true,
  },
  visited_restaurants : {
    type: [restaurantSchema],
    required: false
    },
}, 
  {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};