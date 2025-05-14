import { Flex, Heading, Button, Spacer, Link as ChakraLink, Box } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" px={4} py={2} color="white">
      <Flex alignItems="center">
        <Heading size="md">
          <ChakraLink as={RouterLink} to="/">
            Arnifi
          </ChakraLink>
        </Heading>
        <Spacer />
        {currentUser ? (
          <Flex alignItems="center" gap={4}>
            <ChakraLink as={RouterLink} to="/my-blogs">
              My Blogs
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/blogs/create">
              Create Blog
            </ChakraLink>
            <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex gap={2}>
            <Button as={RouterLink} to="/login" colorScheme="teal" variant="outline">
              Login
            </Button>
            <Button as={RouterLink} to="/signup" colorScheme="teal">
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;