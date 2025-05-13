const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllBlogs);
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;