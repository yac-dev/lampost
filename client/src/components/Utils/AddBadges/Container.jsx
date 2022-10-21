import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

// components
import Badge from './Badge';
import Tabs from './Tabs';

const Container = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [badges, setBadges] = useState([]);
  const [tab, setTab] = useState('');

  const getBadges = async () => {
    const result = await lampostAPI.get('/badges');
    const { badges } = result.data;
    setBadges((previous) => [...previous, ...badges]);
  };

  useEffect(() => {
    getBadges();
  }, []);

  const renderBadges = () => {
    const badgesList = badges.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>;
  };

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        placeholder='Search'
        style={{ height: 60, marginBottom: 20, borderRadius: 10, padding: 10 }}
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        autoCapitalize='none'
        // keyboardType={'visible-password'}
      />
      <Tabs />
      {renderBadges()}
    </View>
  );
};

export default Container;
