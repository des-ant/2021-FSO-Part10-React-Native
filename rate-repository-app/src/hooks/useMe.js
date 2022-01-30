import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useMe = () => {
  const { data, error, loading } = useQuery(ME);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return { me: data.me, error, loading };
}

export default useMe;
