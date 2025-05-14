import {
    Box, Heading, Text, Image, Badge, Flex, Button,
    useToast, Menu, MenuButton, MenuList, MenuItem,
    IconButton, Link as ChakraLink, useDisclosure
  } from '@chakra-ui/react';
  import { Link, useNavigate } from 'react-router-dom';
  import { deleteBlog } from '../services/blogs';
  import { useAuth } from '../context/AuthContext';
  import { HamburgerIcon } from '@chakra-ui/icons';
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from '@chakra-ui/react';
  
  const BlogCard = ({ blog, onDelete }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleDelete = async () => {
      try {
        await deleteBlog(blog._id);
        onDelete(blog._id);
        toast({
          title: 'Blog deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      } catch (error) {
        toast({
          title: 'Delete failed',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }
    };
  
    return (
      <Box
        position="relative"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
      >
        {/* Edit/Delete menu in top-right corner */}
        {currentUser?.userId === blog.userId?._id && (
          <Box position="absolute" top="2" right="2" zIndex="1">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Blog actions"
                icon={<HamburgerIcon />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem onClick={() => navigate(`/blogs/${blog._id}/edit`)}>
                  Edit
                </MenuItem>
                <MenuItem color="red.500" onClick={onOpen}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
  
            {/* Delete confirmation modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this blog? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        )}
  
        {/* Blog image */}
        {blog.image && (
          <Image
            src={blog.image.startsWith('http') ? blog.image : `http://localhost:5000/${blog.image}`}
            alt={blog.title}
            w="full"
            h="200px"
            objectFit="cover"
            mb={4}
            fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
          />
        )}
  
        <Badge colorScheme="teal" mb={2}>
          {blog.category}
        </Badge>
  
        <Heading size="md" mb={2}>
          <ChakraLink as={Link} to={`/blogs/${blog._id}`}>
            {blog.title}
          </ChakraLink>
        </Heading>
  
        <Text fontSize="sm" color="gray.500" mb={2}>
          By {blog.author}
        </Text>
  
        <Text noOfLines={3} mb={4}>
          {blog.content}
        </Text>
  
        <Button
          as={Link}
          to={`/blogs/${blog._id}`}
          colorScheme="teal"
          variant="outline"
          size="sm"
          w="full"
          mb={4}
        >
          Read More
        </Button>
      </Box>
    );
  };
  
  export default BlogCard;  