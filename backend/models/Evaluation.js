const mongoose = require('mongoose');

const {Schema} = mongoose;

const {restaurantSchema} = require('./Restaurant');

const evaluationSchema = new Schema({
  restaurant : {
    type: [restaurantSchema],
    required: false
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