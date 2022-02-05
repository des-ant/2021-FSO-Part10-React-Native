
import { View } from 'react-native';

import { ReviewCard } from './Card';

export const formatDate = (date) => {
  const dateObject = new Date(date);
  const dateString = dateObject.toLocaleDateString('en-GB').replaceAll('/', '.');
  return dateString;
};

const ReviewItem = ({ item }) => (
  <View testID="repositoryItem">
    <ReviewCard item={item} />
  </View>
);

export default ReviewItem;
