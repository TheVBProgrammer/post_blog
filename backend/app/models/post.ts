import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
})

export default mongoose.model('Post', PostSchema)
