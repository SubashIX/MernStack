import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AllBlogs from './pages/AllBlogs';
import MyBlogs from './pages/MyBlogs';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-blogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
