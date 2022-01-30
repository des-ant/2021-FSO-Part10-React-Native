import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  link: {
    padding: 5,
  },
});

const AppBarPressable = ({ tabName, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.link}>
      <Text
        fontWeight="bold"
        fontSize="subheading"
        color="light"
      >
        {tabName}
      </Text>
    </Pressable>
  );
};

export default AppBarPressable;
