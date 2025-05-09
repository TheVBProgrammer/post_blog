import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
  userId: Number,
  title: String,
  body: String,
})

const Post = mongoose.model('Post', PostSchema)
export default Post
