import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { screenSectionBackgroundColor } from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const socialMediasList = [
  {
    type: 'Youtube',
    icon: '',
  },
  {
    type: 'Discord',
    icon: '',
  },
  {
    type: 'Tiktok',
    icon: '',
  },
  {
    type: 'Pinterest',
    icon: '',
  },
  {
    type: 'Snapchat',
    icon: '',
  },
  {
    type: 'Airbnb',
    icon: '',
  },
  {
    type: 'Flicker',
    icon: '',
  },
  {
    type: 'Picsart',
    icon: '',
  },
  {
    type: 'Stackoverflow',
    icon: '',
  },
  {
    type: 'Patreon',
    icon: '',
  },
  {
    type: 'Buy me a coffee',
    icon: '',
  },
  {
    type: 'Twitch',
    icon: '',
  },
  {
    type: 'Spotify',
    icon: '',
  },
  {
    type: 'ebay',
    icon: '',
  },
  {
    type: 'Playstation Network',
    icon: '',
  },
  {
    type: 'Nintendo',
    icon: '',
  },
  {
    type: 'Buy me a coffee',
    icon: '',
  },
  {
    type: 'Github',
    icon: '',
  },
  {
    type: 'Opensea',
    icon: '',
  },
  {
    type: 'Product Hunt',
    icon: '',
  },
  {
    type: 'Xbox',
    icon: '',
  },
  {
    type: 'Decentraland',
    icon: '',
  },
  {
    type: 'Meetup',
    icon: '',
  },
  {
    type: 'Uber',
    icon: '',
  },
  {
    type: 'Dribbble',
    icon: '',
  },
  {
    type: 'Instagram',
    icon: '',
  },
  {
    type: 'Twitter',
    icon: '',
  },
  {
    type: 'Reddit',
    icon: '',
  },
  {
    type: 'Figma',
    icon: 'Quora',
  },
  {
    type: 'Facebook',
    icon: '',
  },
  {
    type: 'Medium',
    icon: '',
  },
];

const SocialMediasList = () => {
  const { MaterialCommunityIcons } = iconsTable;
  return (
    <FlatList
      data={socialMediasList}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={{ paddingTop: 10, marginRight: 15 }}>
            <View style={{ padding: 10, backgroundColor: screenSectionBackgroundColor }}>
              <Text style={{ color: 'white' }}>{item.type}</Text>
            </View>
            <View style={{ position: 'absolute', top: -5, right: -5 }}>
              <MaterialCommunityIcons name='check' size={15} color='white' />
            </View>
          </TouchableOpacity>
        );
      }}
      horizontal={true}
      keyExtractor={(item, index) => `${item.type}-${index}`}
    />
  );
};

export default SocialMediasList;
