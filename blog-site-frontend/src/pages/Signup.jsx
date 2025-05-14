import { Box, Heading, Text, Link as ChakraLink, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(values);
      toast({
        title: 'Account created',
        description: 'Your account has been successfully created!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      navigate('/');
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email or login.';
        } else if (error.response.status === 400) {
          errorMessage = 'Email already exists. Please use a different email or login.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      toast({
        title: 'Signup error',
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
        Create Account
      </Heading>
      <AuthForm isLogin={false} onSubmit={handleSubmit} />
      <Text mt={4} textAlign="center" fontSize="sm">
        Already have an account?{' '}
        <ChakraLink 
          as={RouterLink} 
          to="/login" 
          color="teal.500"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline' }}
        >
          Login
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Signup;