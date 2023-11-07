const mongoose = require('mongoose');
require('dotenv').config(); 


async function main(){
  try{
    mongoose.set("strictQuery", true)
    await mongoose.connect(`mongodb+srv://enricoblanco:${process.env.MONGODB_PASSWORD}@first-mongodb.ulc9nkc.mongodb.net/?retryWrites=true&w=majority`)
  }
  catch(e){
    console.error(e);
  }
  finally{
    console.log("Connection to MongoDB successful");
  }
}

module.exports = main;