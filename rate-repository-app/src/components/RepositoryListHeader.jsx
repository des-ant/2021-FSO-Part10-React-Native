import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import theme from '../theme';

const styles = StyleSheet.create({
  picker: {
    padding: 10,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.subheading,
  },
});

const RepositoryListHeader = ({ filter, setFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce callback
  const debounced = useDebouncedCallback(
    // Update filter state when debounced is called
    (searchKeyword) => {
      setFilter({...filter, searchKeyword});
    },
    // Execute the above function after the delay
    // Delay in ms
    500
  );

  const onChangePicker = itemValue => {
    setFilter(JSON.parse(itemValue));
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    debounced(query);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search repositories"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Picker
        selectedValue={JSON.stringify(filter)}
        onValueChange={onChangePicker}
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
    </View>
  )
}

export default RepositoryListHeader;