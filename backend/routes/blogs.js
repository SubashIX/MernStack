const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const { category, author } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (author) filter.author = author;
  const blogs = await Blog.find(filter);
  res.json(blogs);
});

router.post('/', auth, async (req, res) => {
  const { title, category, content, image } = req.body;
  const blog = new Blog({
    title,
    category,
    content,
    image,
    author: req.user.name,
    userId: req.user._id,
    createdAt: new Date()
  });
  await blog.save();
  res.status(201).json({ message: 'Blog created', blog });
});

router.put('/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
  Object.assign(blog, req.body, { updatedAt: new Date() });
  await blog.save();
  res.json({ message: 'Blog updated', blog });
});

router.delete('/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
  await blog.remove();
  res.json({ message: 'Blog deleted' });
});

module.exports = router;
