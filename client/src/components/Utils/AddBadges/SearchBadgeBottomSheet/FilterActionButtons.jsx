import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// components
import ActionButton from './ActionButton';

const tabs = [
  {
    label: 'Food & Beverage',
    icon: <Ionicons name='ios-pizza-outline' size={24} />,
    query: 'foodAndBeverage',
    onPress: () => {
      console.log('food and beverage');
    },
  },
  {
    label: 'Sports',
    icon: (
      // <MaterialIcons name='sports-baseball' size={24} color={'rgba(225, 221, 0, 0.85)'} style={{ marginRight: 5 }} />
      <MaterialIcons name='sports-baseball' size={24} />
    ),
    query: 'sports',
    onPress: () => {
      console.log('sports tab');
    },
  },
  {
    label: 'Culture',
    // icon: <Foundation name='book' size={24} color={'rgba(170, 100, 0, 0.85)'} style={{ marginRight: 5 }} />,
    icon: <Foundation name='book' size={24} />,
    query: 'culture',
    onPress: () => {
      console.log('culture tab');
    },
  },
  {
    label: 'Gaming',
    icon: <Ionicons name='ios-game-controller-outline' size={24} />,
    query: 'gaming',
    onPress: () => {
      console.log('gaming tab');
    },
  },
  {
    label: 'Tech',
    // icon: <MaterialIcons name='laptop' size={24} color={'rgba(182, 182, 182, 0.85)'} style={{ marginRight: 5 }} />,
    icon: <MaterialIcons name='laptop' size={24} />,
    query: 'tech',
    onPress: () => {
      console.log('tech tab');
    },
  },
  {
    label: 'Anime',
    icon: <MaterialCommunityIcons name='pokeball' size={24} />,
    query: 'anime',
    onPress: () => {
      console.log('anime tab');
    },
  },
  {
    label: 'Profession',
    icon: <MaterialIcons name='engineering' size={24} />,
    query: 'profession',
  },
  {
    label: 'Apps',
    icon: <MaterialCommunityIcons name='youtube' size={24} />,
    query: 'apps',
    onPress: () => {
      console.log('social media tabs');
    },
  },
  {
    label: 'Learning & Education',
    icon: <MaterialCommunityIcons name='lead-pencil' size={24} />,
    query: 'learningAndEducation',
    onPress: () => {
      console.log('education tab');
    },
  },
  {
    label: 'Personality',
    icon: <Entypo name='emoji-happy' size={24} />,
    query: 'personality',
    onPress: () => {
      console.log('personality tab');
    },
  },
  {
    label: 'Countries & Languages',
    icon: <FontAwesome name='globe' size={24} />,
    query: 'countriesAndLanguage',
  },
];

const FilterActionButtons = (props) => {
  const renderTabsMenu = () => {
    const tabsList = tabs.map((tab, index) => {
      return <ActionButton key={index} tab={tab} />;
    });

    return (
      <View style={{ padding: 10 }}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Filter options</Text>
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          {tabsList}
        </ScrollView>
      </View>
    );
  };

  return <View>{renderTabsMenu()}</View>;
};

export default FilterActionButtons;
