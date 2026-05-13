import exp from 'express'
import { ArticleModel } from '../models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const AuthorApp = exp.Router()
export const ArticleApp = exp.Router()

// Author routes
AuthorApp.post('/article', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'AUTHOR') return res.status(403).json({ message: 'Only authors allowed' })

    const { title, content, category } = req.body
    const newArticle = new ArticleModel({ title, content, category, author: req.user._id })
    await newArticle.save()
    res.status(201).json({ message: 'Article published', payload: newArticle })
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish', error: err.message })
  }
})

AuthorApp.get('/articles', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'AUTHOR') return res.status(403).json({ message: 'Only authors allowed' })
    const articles = await ArticleModel.find({ author: req.user._id })
    res.status(200).json({ message: 'Author articles', payload: articles })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch', error: err.message })
  }
})

AuthorApp.patch('/articles', verifyToken, async (req, res) => {
  try {
    const { articleId, isArticleActive } = req.body
    const article = await ArticleModel.findById(articleId)
    if (!article) return res.status(404).json({ message: 'article not found' })
    if (!article.author.equals(req.user._id)) return res.status(403).json({ message: 'not authorized' })
    article.isArticleActive = isArticleActive
    await article.save()
    res.status(200).json({ message: 'Article status updated', payload: article })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message })
  }
})

AuthorApp.put('/articles', verifyToken, async (req, res) => {
  try {
    const { articleId, title, content, category } = req.body
    const article = await ArticleModel.findById(articleId)
    if (!article) return res.status(404).json({ message: 'article not found' })
    if (!article.author.equals(req.user._id)) return res.status(403).json({ message: 'not authorized' })
    if (title) article.title = title
    if (content) article.content = content
    if (category) article.category = category
    await article.save()
    res.status(200).json({ message: 'Article updated', payload: article })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message })
  }
})

// Public/User routes
ArticleApp.get('/article/:id', async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id).populate('author', 'firstName lastName email').populate('comments.user', 'email')
    if (!article) return res.status(404).json({ message: 'article not found' })
    res.status(200).json({ message: 'Article found', payload: article })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch', error: err.message })
  }
})

// add comment
ArticleApp.put('/articles', verifyToken, async (req, res) => {
  try {
    const { articleId, comment } = req.body
    const article = await ArticleModel.findById(articleId)
    if (!article) return res.status(404).json({ message: 'article not found' })
    article.comments.push({ user: req.user._id, comment })
    await article.save()
    const updated = await ArticleModel.findById(articleId).populate('comments.user', 'email').populate('author', 'firstName lastName email')
    res.status(200).json({ message: 'comment added', payload: updated })
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message })
  }
})
