/* eslint-disable no-unused-vars */
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textBox: {
    padding: 15,
    marginBottom: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.borderGrey,
    borderRadius: 4,
  },
  errorInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: 4,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error
    ? [style, styles.textBox, styles.errorInput]
    : [style, styles.textBox];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
