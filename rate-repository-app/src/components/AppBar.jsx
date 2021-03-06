import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import AppBarPressable from './AppBarPressable';
import theme from '../theme';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
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
  const { me } = useGetCurrentUser();
  const [signOut] = useSignOut();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut();
      navigate('/login');
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
        { me &&
          <AppBarTab tabName={'My reviews'} to="/my-reviews" />
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
