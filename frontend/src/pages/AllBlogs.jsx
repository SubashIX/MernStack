import React, { useEffect, useState } from 'react';
import api from '../services/api';
import BlogCard from '../components/BlogCard';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get('/blogs').then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default AllBlogs;
