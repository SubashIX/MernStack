import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogList from './pages/BlogList';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import BlogDetail from './pages/BlogDetail';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box minH="100vh" bg="gray.50">
            <Header />
            <Box p={4}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<PrivateRoute><BlogList /></PrivateRoute>} />
                <Route path="/blogs/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
                <Route path="/blogs/:id/edit" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
                <Route path="/blogs/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
                <Route path="/my-blogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;