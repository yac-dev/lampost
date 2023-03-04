import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { screenSectionBackgroundColor, baseTextColor, inputBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

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

const LinkObject = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const [linkNameTextInput, setLinkNameTextInput] = useState('');
  const [linkAddressTextInput, setLinkAddressTextInput] = useState('');

  return (
    <View>
      <Text>Link{props.index + 1}</Text>
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
      <View>
        <Text style={{ color: 'white', marginBottom: 10 }}>Link name</Text>
        <TextInput
          placeholder='e.g.) My youtube channel'
          placeholderTextColor={baseTextColor}
          style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor }}
          value={linkNameTextInput}
          onChangeText={(text) => setLinkNameTextInput(text)}
        />
        <Text style={{ color: 'white', marginBottom: 10 }}>Link address</Text>
        <TextInput
          placeholder='e.g.) https://youtube/@mychannel'
          placeholderTextColor={baseTextColor}
          style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor }}
          value={linkNameTextInput}
          onChangeText={(text) => setLinkNameTextInput(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.setLinkObjects((previous) => [...previous, { type: '', name: '', url: '' }])}
      >
        <Text style={{ color: 'red' }}>Add more</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkObject;
