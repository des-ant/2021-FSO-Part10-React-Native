import { useMutation, useApolloClient } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: {
      username: username,
      password: password
    }});
    const { accessToken } = data.authenticate;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
