import { Box, Heading, Text, Image, Badge, Button, useToast } from '@chakra-ui/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlogs } from '../services/blogs';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await getBlogs();
        const foundBlog = blogs.find(b => b._id === id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          navigate('/');
          toast({
            title: 'Blog not found',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error fetching blog',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate, toast]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!blog) {
    return <Box>Blog not found</Box>;
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Badge colorScheme="teal" mb={2}>
        {blog.category}
      </Badge>
      <Heading mb={4}>{blog.title}</Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        By {blog.author}
      </Text>
      <Text whiteSpace="pre-line" mb={6}>
        {blog.content}
      </Text>
      {currentUser?.userId === blog.userId && (
        <Button as={Link} to={`/blogs/${blog._id}/edit`} colorScheme="blue" mr={2}>
          Edit
        </Button>
      )}
      <Button as={Link} to="/" colorScheme="teal">
        Back to Blogs
      </Button>
    </Box>
  );
};

export default BlogDetail;