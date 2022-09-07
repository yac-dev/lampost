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
import foodAndBeverage from '../../../../assets/badgeObjects/foodAndBeverage';
import appsAndProducts from '../../../../assets/badgeObjects/appsAndProducts';

const SelectBadges = () => {
  const renderBadges = (badgeObjects, title) => {
    const badgeObjs = badgeObjects.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgeObjs}</View>
      </View>
    );
  };

  return (
    <View style={{ minHeight: '90%' }}>
      <Searchbar placeholder='Search' style={{ height: 40 }} />
      <ScrollView style={{ maxHeight: 500, addingBottom: 150 }}>
        {renderBadges(foodAndBeverage, 'Food & Beverage')}
        {renderBadges(appsAndProducts, 'Apps & Products')}
      </ScrollView>
      <Text>Bottom menu</Text>
    </View>
  );
};

export default connect(null, { selectBadge })(SelectBadges);
