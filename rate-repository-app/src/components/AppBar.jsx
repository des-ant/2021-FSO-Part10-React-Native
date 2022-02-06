import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import AppBarPressable from './AppBarPressable';
import theme from '../theme';
import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const AppBar = () => {
  const { me } = useMe();
  const [signOut] = useSignOut();

  const logOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
      >
        <AppBarTab tabName={'Repositories'} to="/" />
        { me &&
          <AppBarTab tabName={'Create a review'} to="/create-review" />
        }
        { me === null 
        ? <AppBarTab tabName={'Sign In'} to="/login" />
        : <AppBarPressable tabName={'Sign Out'} onPress={logOut} />
        }
        { me === null &&
          <AppBarTab tabName={'Sign Up'} to="/sign-up" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
