import { Schema, model } from 'mongoose'

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  comment: { type: String, required: true }
}, { timestamps: true })

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  isArticleActive: { type: Boolean, default: true },
  comments: [CommentSchema]
}, {
  versionKey: false,
  timestamps: true,
})

export const ArticleModel = model('article', ArticleSchema)
