import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Button, useToast } from '@chakra-ui/react';
import BlogForm from '../components/BlogForm';
import { createBlog } from '../services/blogs';

const CreateBlog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('content', values.content);
      formData.append('image', values.image);


      await createBlog(formData);
      toast({
        title: 'Blog created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error creating blog',
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

  return (
    <Box>
      <Heading mb={6}>Create New Blog</Heading>
      <BlogForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default CreateBlog;