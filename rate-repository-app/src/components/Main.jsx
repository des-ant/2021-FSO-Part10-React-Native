import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import SignIn from './SignIn';
import AppBar from './AppBar';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgGrey,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="repository">
          <Route path=":id" element={<RepositoryView />} exact />
        </Route>
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/create-review" element={<CreateReview />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
