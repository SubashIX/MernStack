import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Button, useToast } from '@chakra-ui/react';
import BlogForm from '../components/BlogForm';
import { getBlogs, updateBlog } from '../services/blogs';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await updateBlog(id, values);
      toast({
        title: 'Blog updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(`/blogs/${id}`);
    } catch (error) {
      toast({
        title: 'Error updating blog',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!blog) {
    return <Box>Blog not found</Box>;
  }

  return (
    <Box>
      <Heading mb={6}>Edit Blog</Heading>
      <BlogForm 
        initialValues={{
          title: blog.title,
          category: blog.category,
          content: blog.content
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default EditBlog;