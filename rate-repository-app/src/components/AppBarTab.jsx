import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable>
      <Text
        fontWeight="bold"
        fontSize="subheading"
        color='light'
      >
        {tabName}
      </Text>
    </Pressable>
);
};

export default AppBarTab;
