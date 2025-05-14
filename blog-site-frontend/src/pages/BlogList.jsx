import { useState, useEffect } from 'react';
import { 
  Box, Heading, Select, Input, SimpleGrid, Spinner, 
  useToast, Text 
} from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/blogs';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    author: ''
  });
  const [searchTimeout, setSearchTimeout] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs(filters);
        setBlogs(data);
      } catch (error) {
        toast({
          title: 'Error fetching blogs',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    // Clear previous timeout if it exists
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeout = setTimeout(() => {
      fetchBlogs();
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    setBlogs(prev => prev.filter(blog => blog._id !== id));
  };

  if (loading && blogs.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center">All Blogs</Heading>
      
      <Box mb={6} display="flex" gap={4} flexWrap="wrap">
        <Select
          placeholder="All Categories"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          width="200px"
          bg="white"
        >
          <option value="">All Categories</option>
          <option value="Career">Career</option>
          <option value="Finance">Finance</option>
          <option value="Travel">Travel</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Other">Other</option>
        </Select>
        
        <Input
          placeholder="Filter by Author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          width="200px"
          bg="white"
        />
      </Box>

      {blogs.length === 0 ? (
        <Text textAlign="center" fontSize="xl" mt={10}>
          No blogs found matching your filters
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default BlogList;