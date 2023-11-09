const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
  if (mongoose.connections[0].readyState) return
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(`mongodb+srv://enricoblanco:${process.env.MONGODB_PASSWORD}@first-mongodb.ulc9nkc.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connection to MongoDB successful')
  } catch (e) {
    throw new Error('Error connecting to database', e)
  }
}
module.exports = connect
