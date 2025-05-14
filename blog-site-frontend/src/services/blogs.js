import axios from 'axios';

const API_URL = 'http://localhost:5000/blogs';

const getBlogs = async (filters = {}) => {
  const { category, author } = filters;
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (author) params.append('author', author);

  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });
  return response.data;
};

const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });
  return response.data;
};

const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/${id}`, blogData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
  });
  return response.data;
};
const getMyBlogs = async (userId) => {
    console.log()
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
      }
    });
    return response.data;
  };

export {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
};