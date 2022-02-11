import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer  = ({
  repositories,
  onEndReach
}) => {
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter]
    = useState({
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: "",
    });
  const { repositories, fetchMore } = useRepositories({
    ...filter,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
      <View>
        <RepositoryListHeader
          filter={filter}
          setFilter={setFilter}
        />
        <RepositoryListContainer
          repositories={repositories}
          onEndReach={onEndReach}
        />
      </View>
  );
};

export default RepositoryList;
