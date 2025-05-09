import mongoose from 'mongoose'
import dotenv from 'dotenv'
// allow to use process.env
dotenv.config()

// get the resource JSONPlaceholder url from .env file
const mongoUrl = process.env.MONGO_URI
const mongodb = process.env.MONGO_DB_NAME
// @ts-ignore
mongoose
  // @ts-ignore
  .connect(mongoUrl, {
    dbname: mongodb,
  })
  .then(() => console.log('MongoDB Connected'))
export default mongoose
