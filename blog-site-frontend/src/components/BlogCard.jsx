import { Box, Heading, Text, Image, Badge, Flex, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { deleteBlog } from '../services/blogs';
import { useAuth } from '../context/AuthContext';

const BlogCard = ({ blog, onDelete }) => {
  const { currentUser } = useAuth();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteBlog(blog._id);
      onDelete(blog._id);
      toast({
        title: 'Blog deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting blog',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      {blog.image && (
        <Image src={`http://localhost:5000/${blog.image}`} alt={blog.title} mb={4} />
      )}
      <Badge colorScheme="teal" mb={2}>
        {blog.category}
      </Badge>
      <Heading size="md" mb={2}>
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        By {blog.author}
      </Text>
      <Text noOfLines={3} mb={4}>
        {blog.content}
      </Text>
      {currentUser?.userId === blog.userId && (
        <Flex justify="space-between">
          <Button
            as={Link}
            to={`/blogs/${blog._id}/edit`}
            size="sm"
            colorScheme="blue"
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default BlogCard;