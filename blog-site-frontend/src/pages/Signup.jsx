import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(values);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading mb={4} textAlign="center">
        Sign Up
      </Heading>
      <AuthForm isLogin={false} onSubmit={handleSubmit} />
      <Text mt={4} textAlign="center">
        Already have an account?{' '}
        <ChakraLink as={RouterLink} to="/login" color="teal.500">
          Login
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Signup;