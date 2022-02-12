import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return { repository: data.repository, error, loading };
};

export default useRepository;
