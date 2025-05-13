import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', category: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/blogs', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} className="border p-2 w-full" />
      <textarea placeholder="Content" onChange={e => setForm({ ...form, content: e.target.value })} className="border p-2 w-full h-32" />
      <input placeholder="Image URL" onChange={e => setForm({ ...form, image: e.target.value })} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">Create Blog</button>
    </form>
  );
};

export default CreateBlog;
