import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ( id ) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id,
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return { repository: data.repository, error, loading };
};

export default useRepository;
