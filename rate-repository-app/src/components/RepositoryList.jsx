import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.subheading,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
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
  const { repositories } = useRepositories(filter);

  return (
      <View>
        <Picker
          selectedValue={JSON.stringify(filter)}
          onValueChange={(itemValue) =>
            setFilter(JSON.parse(itemValue))
          }
          style={styles.picker}
        >
          <Picker.Item
            label="Select an item..."
            value={null}
            enabled={false}
          />
          <Picker.Item
            label="Latest repositories"
            value={JSON.stringify({
              ...filter,
              orderBy: "CREATED_AT",
              orderDirection: "DESC",
            })}
          />
          <Picker.Item
            label="Highest rated repositories"
            value={JSON.stringify({
              ...filter,
              orderBy: "RATING_AVERAGE",
              orderDirection: "DESC",
            })}
          />
          <Picker.Item
            label="Lowest rated repositories"
            value={JSON.stringify({
              ...filter,
              orderBy: "RATING_AVERAGE",
              orderDirection: "ASC",
            })}
          />
        </Picker>
        <RepositoryListContainer repositories={repositories} />
      </View>
  );
};

export default RepositoryList;
