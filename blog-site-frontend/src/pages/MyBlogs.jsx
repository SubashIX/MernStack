import { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Spinner, Text, Button } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import { getMyBlogs } from '../services/blogs'; // Create this function
import { useAuth } from '../context/AuthContext';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, authLoading } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!currentUser) return;
        
        console.log('Fetching blogs for user:', currentUser.userId);
        const data = await getMyBlogs(currentUser.userId); // Specific endpoint
        console.log('Received blogs:', data);
        
        setBlogs(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentUser]);

  const handleDelete = (id) => {
    setBlogs(prev => prev.filter(blog => blog._id !== id));
  };

  if (authLoading || loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
        <Button mt={4} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (blogs.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md" mb={4}>No Blogs Found</Heading>
        <Text>You haven't created any blogs yet.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center">My Blogs</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {blogs.map(blog => (
          <BlogCard 
            key={blog._id} 
            blog={blog} 
            onDelete={handleDelete} 
          />
        ))}
      </SimpleGrid>
    </Box>
  )
};

export default MyBlogs; 