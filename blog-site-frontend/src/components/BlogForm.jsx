import { FormControl, FormLabel, Input, Textarea, Select, Button, VStack, Box, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const BlogForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    image: Yup.mixed()
  });

  return (
    <Formik
      initialValues={{
        title: initialValues?.title || '',
        category: initialValues?.category || '',
        content: initialValues?.content || '',
        image: null
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack spacing={4}>
            <Field name="title">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.title}>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder="Enter blog title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="category">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.category && form.touched.category}>
                  <FormLabel>Category</FormLabel>
                  <Select {...field} placeholder="Select category">
                    <option value="Career">Career</option>
                    <option value="Finance">Finance</option>
                    <option value="Travel">Travel</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Other">Other</option>
                  </Select>
                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="content">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.content && form.touched.content}>
                  <FormLabel>Content</FormLabel>
                  <Textarea {...field} placeholder="Enter blog content" rows={10} />
                  <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="image">
              {({ form }) => (
                <FormControl>
                  <FormLabel>Image (Optional)</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                  />
                  <FormErrorMessage>{form.errors.image}</FormErrorMessage>
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
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;