import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeaderStyle: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryContainer = ({ repository }) => {
  return <RepositoryItem item={repository} showLink />;
};

export const ReviewContainer = ({ review }) => {
  return <ReviewItem item={review} />
};

const RepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return <Text>Loading Repository...</Text>;
  }

  const reviewNodes = repository.reviews
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewContainer review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryContainer repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={styles.listHeaderStyle}
    />
  )
};

export default RepositoryView;
