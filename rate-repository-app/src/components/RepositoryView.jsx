import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

export const RepositoryContainer = ({ repository }) => {
  return <RepositoryItem item={repository} />;
};

const RepositoryView = ({ id }) => {
  const { repository } = useRepository(id);

  if (!repository) {
    return <Text>Loading Repository...</Text>;
  }

  return <RepositoryContainer repository={repository} />;
};

export default RepositoryView;
