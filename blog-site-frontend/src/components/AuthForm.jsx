import { FormControl, FormLabel, Input, Button, VStack, Box, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ isLogin, onSubmit }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    ...(!isLogin && {
      name: Yup.string().required('Required')
    })
  });

  return (
    <Box p={8} maxWidth="500px" mx="auto" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Formik
        initialValues={{
          email: '',
          password: '',
          ...(!isLogin && { name: '' })
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              {!isLogin && (
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Name</FormLabel>
                      <Input {...field} placeholder="Enter your name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}

              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="Enter your email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" placeholder="Enter your password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                width="full"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthForm;