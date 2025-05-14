import { Box, Heading, Text, Link as ChakraLink, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      navigate('/');
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Backend returned an error response
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found. Please sign up first.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      toast({
        title: 'Login error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={6} textAlign="center" size="xl">
        Welcome Back
      </Heading>
      <AuthForm isLogin onSubmit={handleSubmit} />
      <Text mt={4} textAlign="center" fontSize="sm">
        Don't have an account?{' '}
        <ChakraLink 
          as={RouterLink} 
          to="/signup" 
          color="teal.500"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline' }}
        >
          Sign Up
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Login;