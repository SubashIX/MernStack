import { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/blogs';
import { useAuth } from '../context/AuthContext';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        const userBlogs = data.filter(blog => blog.userId === currentUser.userId);
        setBlogs(userBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentUser]);

  const handleDelete = (id) => {
    setBlogs(prev => prev.filter(blog => blog._id !== id));
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box>
      <Heading mb={6}>My Blogs</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyBlogs;