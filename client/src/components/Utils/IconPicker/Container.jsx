import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const filterTypeIdsTable = {
  artsAndCrafts: {
    _id: '640eac88bb51b34346aa01d3',
    name: 'artsAndCrafts',
  },
  animes: {
    _id: '640eac88bb51b34346aa01d0',
    name: 'animes',
  },
  apps: {
    _id: '640eac88bb51b34346aa01d2',
    name: 'apps',
  },
  petsAndAnimals: {
    _id: '640ea1b4ce9f3adbb2038625',
    name: 'petsAndAnimals',
  },
  business: {
    _id: '640eac88bb51b34346aa01d4',
    name: 'business',
  },
  finance: {
    _id: '640eac88bb51b34346aa01d5',
    name: 'finance',
  },
  family: {
    _id: '64112c47cec88f566dc8b8c3',
    name: 'family',
  },
  dancing: {
    _id: '64112c19cec88f566dc8b8c2',
    name: 'dancing',
  },
  education: {
    _id: '640eac88bb51b34346aa01d7',
    name: 'education',
  },
  fashionAndBeauty: {
    _id: '640eac88bb51b34346aa01d8',
    name: 'fashionAndBeauty',
  },
  fitnessAndHealth: {
    _id: '64112e58cec88f566dc8b8c8',
    name: 'fitnessAndHealth',
  },
  films: {
    _id: '640eac88bb51b34346aa01d1',
    name: 'films',
  },
  foodsAndDrinks: {
    _id: '640eac88bb51b34346aa01d9',
    name: 'foodsAndDrinks',
  },
  gamings: {
    _id: '640eac88bb51b34346aa01dd',
    name: 'gamings',
  },
  videoGames: {
    _id: '640ee9b67fdd8afc4c5e6965',
    name: 'videoGames',
  },
  books: {
    _id: '640eacb434dd172e5abbbbd9',
    name: 'books',
  },
  music: {
    _id: '640eac88bb51b34346aa01df',
  },
  outdoors: {
    _id: '64112c86cec88f566dc8b8c4',
    name: 'outdoors',
  },
  photography: {
    _id: '64112cafcec88f566dc8b8c5',
    name: 'photography',
  },
  spirituality: {
    _id: '64112cdccec88f566dc8b8c6',
    name: 'spirituality',
  },
  vehicles: {
    _id: '640eac88bb51b34346aa01dc',
    name: 'vehicles',
  },
  sports: {
    _id: '640eac88bb51b34346aa01e3',
    name: 'sports',
  },
  tech: {
    _id: '640eac88bb51b34346aa01e4',
    name: 'tech',
  },
  writings: {
    _id: '64112cfecec88f566dc8b8c7',
    name: 'writings',
  },
  languagesAndEthnic: {
    _id: '6411371dcec88f566dc8b8ce',
    name: 'languagesAndEthnic',
  },
};

const Container = () => {
  const [icons, setIcons] = useState({
    artsAndCrafts: [],
    animes: [],
    apps: [],
    petsAndAnimals: [],
    businessAndFinance: [],
    brands: [],
    people: [],
    family: [],
    dancing: [],
    education: [],
    fashionAndBeauty: [],
    fitnessAndHealth: [],
    films: [],
    foodsAndDrinks: [],
    gamings: [],
    videoGames: [],
    books: [],
    music: [],
    photography: [],
    spirituality: [],
    vehicles: [],
    sportsAndOutdoors: [],
    tech: [],
    writings: [],
    languagesAndEthnic: [],
  });
  const [selectedFilterOption, setSelectedFilterOption] = useState('');

  useEffect(() => {
    if (!badges[selectedFilterOption].length) {
      getBadges();
    }
  }, [selectedFilterOption]);

  const getIcons = async () => {
    const result = await lampostAPI.get(
      `/badgetypeandbadgerelationships/${filterTypeIdsTable[selectedFilterOption]['_id']}`
    );
    const { badges } = result.data;
    setBadges((previous) => {
      const updating = { ...previous };
      updating[selectedFilterOption] = badges;
      return updating;
    });
    console.log(badges);
  };
  // これも, fromcomponentが必要か。
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ height: 70, padding: 10 }}>
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          <FilterOption
            label='Arts & Crafts'
            value={'artsAndCrafts'}
            icon={<MaterialIcons name='color-lens' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('artsAndCrafts')}
          />
          <FilterOption
            label='Animes'
            value='animes'
            icon={<MaterialCommunityIcons name='pokeball' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('animes')}
          />
          <FilterOption
            label='Apps'
            value='apps'
            icon={<MaterialCommunityIcons name='instagram' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('apps')}
          />
          <FilterOption
            label='Books'
            value='books'
            icon={<Entypo name='book' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('books')}
          />
          <FilterOption
            label='Business & Finance'
            value='businessAndFinance'
            icon={<MaterialCommunityIcons name='finance' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('businessAndFinance')}
          />
          <FilterOption
            label='Vehicles'
            value='vehicles'
            icon={<MaterialCommunityIcons name='motorbike' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('vehicles')}
          />
          <FilterOption
            label='Dancing'
            value='dancing'
            icon={
              <MaterialCommunityIcons name='dance-ballroom' size={25} color={'white'} style={{ marginRight: 10 }} />
            }
            onFilterOptionPress={() => setSelectedFilterOption('dancing')}
          />
          <FilterOption
            label='Education'
            value='education'
            icon={<Entypo name='graduation-cap' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('education')}
          />
          <FilterOption
            label='Fashion & Beauty'
            value='fashionAndBeauty'
            icon={<MaterialCommunityIcons name='shopping' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('fashionAndBeauty')}
          />
          <FilterOption
            label='Foods & Drinks'
            value='foodsAndDrinks'
            icon={<MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('foodsAndDrinks')}
          />
          {/* <FilterOption
              label='Fitness & Health'
              value='fitnessAndHealth'
              icon={<Ionicons name='fitness' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('fitnessAndHealth')}
            /> */}
          <FilterOption
            label='Gamings'
            value='gamings'
            icon={<MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('gamings')}
          />
          <FilterOption
            label='Languages & Ethnic'
            value='languagesAndEthnic'
            icon={<Entypo name='globe' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('languagesAndEthnic')}
          />
          <FilterOption
            label='Films'
            value='films'
            icon={<Fontisto name='film' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('films')}
          />
          <FilterOption
            label='Music'
            value='music'
            icon={<Ionicons name='musical-notes' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('music')}
          />
          <FilterOption
            label='Spirituality'
            value='spirituality'
            icon={<MaterialCommunityIcons name='ufo-outline' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('spirituality')}
          />
          <FilterOption
            label='Family'
            value='family'
            icon={<MaterialIcons name='family-restroom' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('family')}
          />
          <FilterOption
            label='Video games'
            value='videoGames'
            icon={<Ionicons name='ios-game-controller' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('videoGames')}
          />
          <FilterOption
            label='Sports & Outdoors'
            value='sportsAndOutdoors'
            icon={<Ionicons name='basketball' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('sportsAndOutdoors')}
          />
          <FilterOption
            label='Tech'
            value='tech'
            icon={<Entypo name='code' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('tech')}
          />
          <FilterOption
            label='Pets & Animals'
            value='petsAndAnimals'
            icon={<MaterialIcons name='pets' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('petsAndAnimals')}
          />
          <FilterOption
            label='Photography'
            value='photography'
            icon={<Fontisto name='photograph' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('photography')}
          />
          <FilterOption
            label='Writings'
            value='writings'
            icon={<Ionicons name='pencil' size={25} color={'white'} style={{ marginRight: 10 }} />}
            onFilterOptionPress={() => setSelectedFilterOption('writings')}
          />
        </ScrollView>
        {/* <Badges /> */}
      </View>
    </View>
  );
};

export default Container;
