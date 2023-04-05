import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  baseBackgroundColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import { iconsTable } from '../../../utils/icons';

const images = [
  'animes',
  'apps',
  'artsAndCrafts',
  'books',
  'business',
  'dancing',
  'education',
  'family',
  'fashionAndBeauty',
  'films',
  'finance',
  'fitnessAndHealth',
  'foodsAndDrinks',
  'gamings',
  'languagesAndEthnic',
  'music',
  'outdoors',
  'petsAndAnimals',
  'photography',
  'spirituality',
  'sports',
  'tech',
  'vehicles',
  'videoGames',
  'writings',
];

const Icons = (props) => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const { Ionicons } = iconsTable;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={selectedIcon ? false : true}>
          <Text style={{ color: selectedIcon ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedIcon]);
  const onDonePress = () => {
    props.navigation.navigate('Create new library', { iconName: selectedIcon });
  };

  return (
    <ScrollView style={{ backgroundColor: baseBackgroundColor, flex: 1, padding: 10 }}>
      {images.map((image, index) => {
        return (
          <TouchableOpacity
            onPress={() => setSelectedIcon(image)}
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7, justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: rnDefaultBackgroundColor,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <FastImage
                  source={{ uri: `https://lampost-dev.s3.us-east-2.amazonaws.com/icons/${image}.png` }}
                  style={{ width: 30, height: 30, color: 'black' }}
                />
              </View>
              <Text style={{ color: 'white', fontSize: 18 }}>{image}</Text>
            </View>
            {selectedIcon === image ? (
              <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
            ) : null}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Icons;
