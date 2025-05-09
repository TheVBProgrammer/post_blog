import mongoose, { Schema } from 'mongoose'
//https://jsonplaceholder.typicode.com/users
const UserSchema = new Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
