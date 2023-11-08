const mongoose = require('mongoose');
require('dotenv').config(); 


async function main(){
  try{
    mongoose.set("strictQuery", true)
    await mongoose.connect(`mongodb+srv://enricoblanco:${process.env.MONGODB_PASSWORD}@first-mongodb.ulc9nkc.mongodb.net/?retryWrites=true&w=majority`)
    console.log("Connection to MongoDB successful")
  }
  catch(e){
    console.error(e);
  }
}

module.exports = main;