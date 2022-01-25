import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  link: {
    margin: 5,
  },
});

const AppBarTab = ({ tabName, to }) => {
  return (
    <Link to={to} style={styles.link}>
      <Text
        fontWeight="bold"
        fontSize="subheading"
        color="light"
      >
        {tabName}
      </Text>
    </Link>
);
};

export default AppBarTab;
