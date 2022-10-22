import React from 'react';
import { View, Text } from 'react-native';
import { Searchbar as RNPSearchBar } from 'react-native-paper';

const SearchBar = () => {
  return (
    <View>
      <RNPSearchBar
        placeholder='Search'
        style={{ height: 50, borderRadius: 10, padding: 10 }}
        // value={searchQuery}
        // onChangeText={(query) => setSearchQuery(query)}
        autoCapitalize='none'
        // keyboardType={'visible-password'}
      />
    </View>
  );
};

export default SearchBar;
