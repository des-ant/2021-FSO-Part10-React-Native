import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES_ORDERED } from '../graphql/queries';

const useRepositoriesOrdered = ({ orderBy, orderDirection }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_ORDERED, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return { repositories: data.repositories, error, loading };
};

export default useRepositoriesOrdered;
