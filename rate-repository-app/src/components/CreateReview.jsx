import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
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
  text: yup
    .string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={createReviewFormStyles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType = "numeric"
      />
      <FormikTextInput
        name="text"
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
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {
      ownerName,
      repositoryName,
      rating,
      text
    } = values;

    const ratingNumber = Number(rating);

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: ratingNumber,
        text
      });
      const { repositoryId } = data.createReview;
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />
};

export default CreateReview;
