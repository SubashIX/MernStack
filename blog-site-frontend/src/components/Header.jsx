import {
    Flex,
    Heading,
    Button,
    Spacer,
    Link as ChakraLink,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
  } from '@chakra-ui/react';
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import { useRef } from 'react';
  import { useAuth } from '../context/AuthContext';
  
  const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
  
    const handleConfirmLogout = () => {
      logout();
      onClose();
      navigate('/login');
    };
  
    return (
      <>
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
                <ChakraLink as={RouterLink} to="/">
                  All Blogs
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/my-blogs">
                  My Blogs
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/blogs/create">
                  Create Blog
                </ChakraLink>
                <Button colorScheme="teal" variant="outline" onClick={onOpen}>
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
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Logout
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to log out?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleConfirmLogout} ml={3}>
                  Logout
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };
  
  export default Header;  