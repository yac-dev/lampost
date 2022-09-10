// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

// components
import Badge from './Badge';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';

// icons
import foodAndBeverage from '../../../../assets/badgeCollection/foodAndBeverage';
// import appsAndProducts from '../../../../assets/badgeCollection/appsAndProducts';

const SelectBadges = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const renderFilteredBadges = (badgeObjects, title) => {
    const filteredBadgesList = Object.values(badgeObjects)
      .filter((object) => {
        if (!searchQuery) {
          return object;
        } else if (object.value.toLowerCase().includes(searchQuery.toLowerCase())) {
          return object;
        }
      })
      .map((badge, index) => {
        return <Badge key={index} badge={badge} />;
      });

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{filteredBadgesList}</View>
      </View>
    );
  };

  return (
    <View style={{ minHeight: '90%' }}>
      <Searchbar
        placeholder='Search'
        style={{ height: 40 }}
        value={searchQuery}
        onChangeText={(query) => {
          onChangeSearch(query);
        }}
        autoCapitalize='none'
        keyboardType={'visible-password'}
      />
      <ScrollView style={{ maxHeight: 500, addingBottom: 150 }}>
        {renderFilteredBadges(foodAndBeverage, 'Food & Beverage')}
        {/* {renderFilteredBadges(appsAndProducts, 'Apps & Products')} */}
      </ScrollView>
      <Text>Bottom menu</Text>
    </View>
  );
};

export default connect(null, { selectBadge })(SelectBadges);
