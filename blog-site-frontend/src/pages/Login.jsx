import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading mb={4} textAlign="center">
        Login
      </Heading>
      <AuthForm isLogin onSubmit={handleSubmit} />
      <Text mt={4} textAlign="center">
        Don't have an account?{' '}
        <ChakraLink as={RouterLink} to="/signup" color="teal.500">
          Sign Up
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Login;