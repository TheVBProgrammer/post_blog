import mongoose from 'mongoose'

/**
 * @description POST Model Schema
 */
const PostSchema = new mongoose.Schema(
  {
    userId: Number,
    id: { type: Number, required: true, unique: true },
    title: String,
    body: String,
  },
  { timestamps: true }
)

export default mongoose.model('Post', PostSchema)
