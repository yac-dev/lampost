import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FormContext from './FormContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialIcons, MaterialCommunityIcons, Entypo, Fontisto, Ionicons } = iconsTable;

const genreTable = {
  artsAndCrafts: {
    _id: '640eac88bb51b34346aa01d3',
    name: 'artsAndCrafts',
    label: 'Arts & Crafts',
    value: 'artsAndCrafts',
    icon: <MaterialIcons name='color-lens' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  animes: {
    _id: '640eac88bb51b34346aa01d0',
    name: 'animes',
    label: 'Animes',
    value: 'animes',
    icon: <MaterialCommunityIcons name='pokeball' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  apps: {
    _id: '640eac88bb51b34346aa01d2',
    name: 'apps',
    label: 'Apps',
    value: 'apps',
    icon: <MaterialCommunityIcons name='instagram' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  petsAndAnimals: {
    _id: '640ea1b4ce9f3adbb2038625',
    name: 'petsAndAnimals',
    label: 'Pets & Animals',
    value: 'petsAndAnimals',
    icon: <MaterialIcons name='pets' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  businessAndFinance: {
    _id: '640eac88bb51b34346aa01d4',
    name: 'businessAndFinance',
    label: 'Business & Finance',
    value: 'businessAndFinance',
    icon: <MaterialCommunityIcons name='finance' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  dancing: {
    _id: '64112c19cec88f566dc8b8c2',
    name: 'dancing',
    label: 'Dancings',
    value: 'dancing',
    icon: <MaterialCommunityIcons name='dance-ballroom' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  education: {
    _id: '640eac88bb51b34346aa01d7',
    name: 'education',
    label: 'Education',
    value: 'education',
    icon: <Entypo name='graduation-cap' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  fashionAndBeauty: {
    _id: '640eac88bb51b34346aa01d8',
    name: 'fashionAndBeauty',
    label: 'Fashion & Beauty',
    value: 'fashionAndBeauty',
    icon: <MaterialCommunityIcons name='shopping' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  films: {
    _id: '640eac88bb51b34346aa01d1',
    name: 'films',
    label: 'Films',
    value: 'films',
    icon: <Fontisto name='film' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  foodsAndDrinks: {
    _id: '640eac88bb51b34346aa01d9',
    name: 'foodsAndDrinks',
    label: 'Foods & Drinks',
    value: 'foodsAndDrinks',
    icon: <MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  gamings: {
    _id: '640eac88bb51b34346aa01dd',
    name: 'gamings',
    label: 'Gamings',
    value: 'gamings',
    icon: <MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  videoGames: {
    _id: '640ee9b67fdd8afc4c5e6965',
    name: 'videoGames',
    label: 'Video games',
    value: 'videoGames',
    icon: <Ionicons name='ios-game-controller' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  books: {
    _id: '640eacb434dd172e5abbbbd9',
    label: 'Books',
    name: 'books',
    value: 'books',
    icon: <Entypo name='book' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  music: {
    _id: '640eac88bb51b34346aa01df',
    label: 'Music',
    name: 'music',
    value: 'music',
    icon: <Ionicons name='musical-notes' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  photography: {
    _id: '64112cafcec88f566dc8b8c5',
    name: 'photography',
    label: 'Photography',
    value: 'photography',
    icon: <Fontisto name='photograph' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  vehicles: {
    _id: '640eac88bb51b34346aa01dc',
    name: 'vehicles',
    label: 'Vehicles',
    value: 'vehicles',
    icon: <MaterialCommunityIcons name='motorbike' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  sports: {
    _id: '640eac88bb51b34346aa01e3',
    name: 'sports',
    label: 'Sports & Outdoors',
    value: 'sportsAndOutdoors',
    icon: <Ionicons name='basketball' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  tech: {
    _id: '640eac88bb51b34346aa01e4',
    name: 'tech',
    label: 'Tech',
    value: 'tech',
    icon: <Entypo name='code' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  writings: {
    _id: '64112cfecec88f566dc8b8c7',
    name: 'writings',
    label: 'Writings',
    value: 'writings',
    icon: <Ionicons name='pencil' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
  languagesAndEthnic: {
    _id: '6411371dcec88f566dc8b8ce',
    name: 'languagesAndEthnic',
    label: 'Language & Ethnics',
    value: 'languagesAndEthnic',
    icon: <Entypo name='globe' size={25} color={'white'} style={{ marginRight: 5 }} />,
  },
};

const BadgeGenres = (props) => {
  const { selectedBadgeGenre, setSelectedBadgeGenre, accordion, setAccordion } = useContext(FormContext);

  const renderGenres = () => {
    const list = Object.values(genreTable).map((genre, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              selectedBadgeGenre && selectedBadgeGenre.value === genre.value
                ? iconColorsTable['blue1']
                : screenSectionBackgroundColor,
            marginRight: 10,
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => setSelectedBadgeGenre(genre)}
        >
          {genre.icon}
          <Text style={{ color: 'white' }}>{genre.label}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                genre: !previous.genre,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['yellow1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='list' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Badge genre</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  genre: !previous.genre,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.genre ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.genre ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', color: baseTextColor, marginBottom: 10 }}>
            Note that badge name should be unique.
          </Text>
          {renderGenres()}
        </View>
      ) : null}
    </View>
  );
};

export default BadgeGenres;
