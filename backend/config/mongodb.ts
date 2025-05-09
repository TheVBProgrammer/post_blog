import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // this will allow to use process.env

//get connection string from env
const mongoUri = process.env.MONGO_URI
// get the database name from .env
const mongodb = process.env.MONGO_DB_NAME
// Create MongoDB connection
mongoose
  // @ts-ignore
  .connect(mongoUri, {
    // specify the database name as post_blog derive from .env
    dbname: mongodb,
  })
  // successfully connection established
  .then(() => console.log('MongoDB is now connected.'))
// Error on Connection
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error!', error)
})
export default mongoose
