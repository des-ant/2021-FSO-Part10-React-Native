import React from 'react';
import { View, Image, StyleSheet, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import { shortenCount } from './RepositoryItem';
import { formatDate } from './ReviewItem';
import useDeleteReview from '../hooks/useDeleteReview';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    marginVertical: 5,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 5,
    alignSelf: 'flex-start',
  },
  line: {
    marginBottom: 10,
  },
  reviewRating: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{
          uri: `${item.ownerAvatarUrl}`
        }} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <View style={cardHeaderStyles.line}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        </View>
        <View style={cardHeaderStyles.line}>
          <Text color="textSecondary">{item.description}</Text>
        </View>
        <View style={cardHeaderStyles.languageTag}>
          <Text color="light">{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

const ReviewCardHeader = ({ item, title }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <View style={cardHeaderStyles.reviewRating}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            color="primary"
          >
            {item.rating}
          </Text>
        </View>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <View style={cardHeaderStyles.line}>
          <Text fontWeight="bold" fontSize="subheading">{title}</Text>
        </View>
        <View style={cardHeaderStyles.line}>
          <Text color="textSecondary">{formatDate(item.createdAt)}</Text>
        </View>
        <View>
          <Text>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-evenly',
    maxWidth: 400,
  },
  statContainer: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  buttonError: {
    backgroundColor: theme.colors.error,
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
  },
});

const CardBodyStat = ({ stat, value }) => {
  return (
    <View style={cardBodyStyles.statContainer}>
      <View>
        <Text fontWeight='bold'>{value}</Text>
      </View>
      <View>
        <Text color='textSecondary'>{stat}</Text>
      </View>
    </View>
  );
};

const CardBody = ({ item }) => {
  return (
    <View style={cardBodyStyles.container}>
      <CardBodyStat
        stat='Stars'
        value={shortenCount(item.stargazersCount)}
      />
      <CardBodyStat
        stat='Forks'
        value={shortenCount(item.forksCount)}
      />
      <CardBodyStat
        stat='Reviews'
        value={item.reviewCount}
      />
      <CardBodyStat
        stat='Rating'
        value={item.ratingAverage}
      />
    </View>
  );
};

const CardLink = ({ item }) => {
  const openLink = async (url) => {
    const canOpenUrl =  await Linking.canOpenURL(url);
    if (canOpenUrl) {
      return await Linking.openURL(url);
    }
  }

  return (
    <View style={cardBodyStyles.container}>
      <Pressable onPress={() => openLink(item.url)} style={cardBodyStyles.button}>
        <Text
          fontWeight="bold"
          color="light"
        >Open in GitHub</Text>
      </Pressable>
    </View>
  )
}

const MyReviewCardLink = ({ item, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const viewRepository = (item) => {
    navigate(`/repository/${item.repository.id}`);
  }

  const handleDeleteReview = async (item) => {
    try {
      await deleteReview({ deleteReviewId: item.id });
      refetch();
    } catch (e) {
      console.log(e);
    }
  }

  const createDeleteAlert = (item) =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => handleDeleteReview(item),
          style: "cancel"
        },
        { text: "DELETE", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={cardBodyStyles.buttonContainer}>
      <Pressable onPress={() => viewRepository(item)} style={cardBodyStyles.button}>
        <Text
          fontWeight="bold"
          color="light"
        >View repository</Text>
      </Pressable>
      <Pressable onPress={() => createDeleteAlert(item)} style={cardBodyStyles.buttonError}>
        <Text
          fontWeight="bold"
          color="light"
        >Delete review</Text>
      </Pressable>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.light,
    padding: 15,
  },
});

const Card = ({ item, showLink }) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader item={item} />
      <CardBody item={item} />
      {showLink && <CardLink item={item} />}
    </View>
  );
};

export const ReviewCard = ({ item }) => {
  return (
    <View style={cardStyles.container}>
      <ReviewCardHeader
        item={item}
        title={item.user.username}
      />
    </View>
  );
}

export const MyReviewCard = ({ item, refetch }) => {
  return (
    <View style={cardStyles.container}>
      <ReviewCardHeader
        item={item}
        title={item.repository.fullName}
      />
      <MyReviewCardLink item={item} refetch={refetch} />
    </View>
  );
}

export default Card;
