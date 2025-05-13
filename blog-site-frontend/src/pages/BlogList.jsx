import { useState, useEffect } from 'react';
import { Box, Heading, Select, Input, SimpleGrid, Spinner } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/blogs';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    author: ''
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs(filters);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    setBlogs(prev => prev.filter(blog => blog._id !== id));
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box>
      <Heading mb={6}>All Blogs</Heading>
      
      <Box mb={6} display="flex" gap={4}>
        <Select
          placeholder="Filter by category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          width="200px"
        >
          <option value="Career">Career</option>
          <option value="Finance">Finance</option>
          <option value="Travel">Travel</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Other">Other</option>
        </Select>
        
        <Input
          placeholder="Filter by author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          width="200px"
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BlogList;