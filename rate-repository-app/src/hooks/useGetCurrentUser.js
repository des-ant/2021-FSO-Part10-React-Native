import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useGetCurrentUser = (variables) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return { me: data?.me, error, loading };
}

export default useGetCurrentUser;
