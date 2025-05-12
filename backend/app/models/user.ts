import mongoose from 'mongoose'

/**
 * @description User Schema Model
 */
const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  token: String,
})

export default mongoose.model('User', UserSchema)
