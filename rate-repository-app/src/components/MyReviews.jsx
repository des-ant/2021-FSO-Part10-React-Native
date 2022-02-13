import { FlatList, StyleSheet, View } from 'react-native';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import Text from './Text';
import { MyReviewItem } from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeaderStyle: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewContainer = ({ review, refetch }) => {
  return <MyReviewItem item={review} refetch={refetch} />
};

const MyReviews = () => {
  const { me, refetch } = useGetCurrentUser({
    includeReviews: true,
  });

  if (!me) {
    return <Text>Loading Reviews...</Text>;
  }

  const reviewNodes = me.reviews
  ? me.reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewContainer review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={styles.listHeaderStyle}
    />
  )
};

export default MyReviews;
