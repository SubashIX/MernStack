import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/blogs').then(res => {
      const blog = res.data.find(b => b._id === id);
      if (blog) setForm(blog);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/blogs/${id}`, form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" />
      <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border p-2 w-full" />
      <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="border p-2 w-full h-32" />
      <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white p-2 w-full">Update Blog</button>
    </form>
  );
};

export default EditBlog;
