import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Tabs = () => {
  const tabs = [
    {
      label: 'Food & Beverage',
      icon: <Ionicons name='ios-pizza-outline' size={24} color={'red'} style={{ marginRight: 5 }} />,
      onPress: () => {
        console.log('food and beverage');
      },
    },
    {
      label: 'Sports',
      icon: (
        <MaterialIcons name='sports-baseball' size={24} color={'rgba(225, 221, 0, 0.85)'} style={{ marginRight: 5 }} />
      ),
      onPress: () => {
        console.log('sports tab');
      },
    },
    {
      label: 'Culture',
      icon: <Foundation name='book' size={24} color={'rgba(170, 100, 0, 0.85)'} style={{ marginRight: 5 }} />,
      onPress: () => {
        console.log('culture tab');
      },
    },
    {
      label: 'Gaming',
      icon: <Ionicons name='ios-game-controller-outline' size={24} color={'green'} style={{ marginRight: 5 }} />,
      onPress: () => {
        console.log('gaming tab');
      },
    },
    {
      label: 'Tech',
      icon: <MaterialIcons name='laptop' size={24} color={'rgba(182, 182, 182, 0.85)'} style={{ marginRight: 5 }} />,
      onPress: () => {
        console.log('tech tab');
      },
    },
    {
      label: 'Apps',
      icon: <MaterialCommunityIcons name='youtube' size={24} color={'red'} style={{ marginRight: 5 }} />,
      onPress: () => {
        console.log('social media tabs');
      },
    },
  ];

  const renderTabsMenu = () => {
    const tabsList = tabs.map((tab, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            borderRadius: 7,
            // backgroundColor,
            borderStyle: 'solid',
            borderColor: '#D7D7D7',
            borderWidth: 1,
            padding: 5,
            marginRight: 10,
          }}
          onPress={() => {
            tab.onPress();
          }}
        >
          <View>{tab.icon}</View>
          <Text>{tab.label}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 10 }}>
        {tabsList}
      </ScrollView>
    );
  };
  return <>{renderTabsMenu()}</>;
};

export default Tabs;
