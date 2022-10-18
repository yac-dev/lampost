import React, { useState, useEffect } from 'react';
import lampostAPI from '../../apis/lampost';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

// とりあえず、badgeを全部取ってくるようにするか。めんどいから。
const AddBadges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [badges, setBadges] = useState([]);

  const getBadges = async () => {
    const result = await lampostAPI.get('/badges');
    const { badges } = result.data;
    setBadges((previous) => [...previous, ...badges]);
  };

  useEffect(() => {
    getBadges();
  }, []);

  const re = () => {
    if (badges.length) {
      const lis = badges.map((badge, index) => {
        return (
          <View key={index}>
            <Text>{badge.name}</Text>
            <FastImage
              style={{ width: 35, height: 35 }}
              source={{
                uri: badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor='red'
              // resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        );
      });

      return <>{lis}</>;
    }
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
      <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 30 }}>
        <TouchableOpacity>
          <Text>Food & Beverage</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Gamings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tech</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Music</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>{re()}</View>
    </View>
  );
};

export default AddBadges;
