import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const res = await api.get('/blogs');
    const user = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    setBlogs(res.data.filter(b => b.userId === user.id));
  };

  const deleteBlog = async (id) => {
    await api.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      {blogs.map(blog => (
        <div key={blog._id} className="mb-4 border p-4">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <button onClick={() => navigate(`/edit/${blog._id}`)} className="mr-2 bg-yellow-500 text-white p-1">Edit</button>
          <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white p-1">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
