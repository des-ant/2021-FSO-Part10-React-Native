import { View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignin';
import { formStyles } from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be between 1 and 30 characters')
    .max(30, 'Username must be between 1 and 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={formStyles.button} testID="submitButton">
        <Text
          color="light"
          fontWeight="bold"
          fontSize="subheading"
          textAlign="center"
        >Sign Up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;
