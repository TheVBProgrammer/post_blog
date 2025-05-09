import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  token: String,
})

export default mongoose.model('User', UserSchema)
