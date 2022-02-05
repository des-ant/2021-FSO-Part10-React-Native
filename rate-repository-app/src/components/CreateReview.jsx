import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignin';

const createReviewFormStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.light,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
  },
});

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .integer()
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100')
    .required('Rating is required'),
  review: yup
    .string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={createReviewFormStyles.container}>
      <FormikTextInput
        name="repositoryOwner"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        name="review"
        placeholder="Review"
        multiline
        numberOfLines={6}
      />
      <Pressable onPress={onSubmit} style={createReviewFormStyles.button} testID="submitButton">
        <Text
          color="light"
          fontWeight="bold"
          fontSize="subheading"
          textAlign="center"
        >Create a review</Text>
      </Pressable>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {
      repositoryOwner,
      repositoryName,
      rating,
      review
    } = values;

    try {
      await signIn({
        repositoryOwner,
        repositoryName,
        rating,
        review
      });
      navigate('/create-review');
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />
};

export default CreateReview;
