import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';

import Text from './Text';
import { shortenCount } from './RepositoryItem';

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

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.light,
    padding: 15,
  },
});

const Card = ({ item }) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader item={item} />
      <CardBody item={item} />
    </View>
  );
};

export default Card;
