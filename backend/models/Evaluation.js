const mongoose = require('mongoose');

const {Schema} = mongoose;

const {restaurantSchema} = require('./Restaurant');
const { userSchema } = require('./User');

const evaluationSchema = new Schema({
  user_id :  {
    type: String,
    required: true,
  },
  restaurant_id : {
    type: String,
    required: true
    },
  rating :  {
    type: Number,
    required: true,
  },
  comment :  {
    type: String,
    required: false,
  },
  date :  {
    type: Date,
    required: true,
  },
},
  {timestamps: true}
);



const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = {Evaluation, evaluationSchema};