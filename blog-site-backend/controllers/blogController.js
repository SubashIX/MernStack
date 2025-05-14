const Blog = require('../models/Blog');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('image');

const getAllBlogs = async (req, res) => {
    try {
      const { category, author } = req.query;
      const filter = {};
      
      if (category) filter.category = category;
      if (author) filter.author = { $regex: author, $options: 'i' };
  
      const blogs = await Blog.find(filter).populate('userId', 'name');
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

const createBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    try {
      const { title, category, content } = req.body;
      const user = await User.findById(req.userId);
      
      const blog = new Blog({
        title,
        category,
        author: user.name,
        content,
        image: req.file ? req.file.path : null,
        userId: req.userId
      });

      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content } = req.body;
    
    const blog = await Blog.findOne({ _id: id, userId: req.userId });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or unauthorized' });
    }

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.content = content || blog.content;
    blog.updatedAt = Date.now();

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findOneAndDelete({ _id: id, userId: req.userId });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or unauthorized' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog };