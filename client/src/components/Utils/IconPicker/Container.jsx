import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import IconPickerContext from './IconPickerContext';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../apis/lampost';
import {
  baseBackgroundColor,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import FilterOptionTab from './FilterOptionTab';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, Ionicons, MaterialIcons, Entypo, Fontisto } = iconsTable;

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
  businessAndFinance: {
    _id: '640eac88bb51b34346aa01d4',
    name: 'businessAndFinance',
  },
  family: {
    _id: '64112c47cec88f566dc8b8c3',
    name: 'family',
  },
  brands: {
    _id: '6443460443e75c808275f883',
    name: 'brands',
  },
  people: {
    _id: '6443464743e75c808275f884',
    name: 'people',
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
  sportsAndOutdoors: {
    _id: '640eac88bb51b34346aa01e3',
    // list: sports,
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
  // nature: '640eac88bb51b34346aa01e0',
  // vegetables: '640eac88bb51b34346aa01e1',
  // politics: '640ead24a862be0c12829d4e',
  // professions: '640eacee615e693f22937822',

  // science: '640eac88bb51b34346aa01e5',
  // travel: {
  //   _id: '640eac88bb51b34346aa01e6',
  // },
};

const Container = (props) => {
  const { isIpad, auth } = useContext(GlobalContext);
  // const [icons, setIcons] = useState({});
  const [isIconsFetched, setIsIconsFetched] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedFilterOption, setSelectedFilterOption] = useState('artsAndCrafts');
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 16 : Dimensions.get('window').width / 8;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;
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

  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    // if (props.route.params.fromComponent === 'CREATE_USER_BADGE') {
    // setFromComponent('CREATE_USER_BADGE');
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ name: 'Create badge', params: { selectedIcon }, merge: true })}
          disabled={selectedIcon ? false : true}
        >
          <Text
            style={{
              color: selectedIcon ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: selectedIcon ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
    // }
  }, [selectedIcon]);

  const getIconsByType = async () => {
    const result = await lampostAPI.get(
      `/iconandicontyperelationships/${filterTypeIdsTable[selectedFilterOption]['_id']}`
    );
    const { icons } = result.data;
    setIcons((previous) => {
      const updating = { ...previous };
      icons.forEach((icon) => {
        if (icon) {
          updating[selectedFilterOption].push(icon);
        }
      });
      return updating;
    });
  };

  useEffect(() => {
    if (!icons[selectedFilterOption].length) {
      getIconsByType();
    }
  }, [selectedFilterOption]);

  const getIcons = async () => {
    const result = await lampostAPI.get('/icons');
    const { icons } = result.data;
    setIcons(() => {
      const table = {};
      icons.forEach((icon) => {
        table[icon._id] = icon;
      });
      return table;
    });
    setIsIconsFetched(true);
  };

  // useEffect(() => {
  //   getIcons();
  // }, []);

  const renderIcons = () => {
    const renderingIcons = icons[selectedFilterOption];
    if (renderingIcons.length) {
      const iconsList = icons[selectedFilterOption].map((icon, index) => {
        return (
          <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: rnDefaultBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                setSelectedIcon(icon);
              }}
            >
              <FastImage source={{ uri: icon.url }} style={{ width: 35, height: 35 }} tintColor={'black'} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{iconsList}</View>
        </ScrollView>
      );
    } else {
      return <ActivityIndicator />;
    }
    // const list = Object.values(icons).map((icon, index) => {
    //   return (
    //     <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
    //       <TouchableOpacity
    //         style={{
    //           width: '100%',
    //           height: '100%',
    //           backgroundColor: rnDefaultBackgroundColor,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           borderRadius: 5,
    //         }}
    //         onPress={() => {
    //           setSelectedIcon(icon);
    //         }}
    //       >
    //         <FastImage source={{ uri: icon.url }} style={{ width: 35, height: 35 }} tintColor={'black'} />
    //       </TouchableOpacity>
    //     </View>
    //   );
    // });

    // return (
    //   <ScrollView>
    //     <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>
    //   </ScrollView>
    // );
  };

  return (
    <IconPickerContext.Provider value={{ selectedFilterOption }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {selectedIcon ? (
          <View
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: rnDefaultBackgroundColor,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <FastImage source={{ uri: selectedIcon.url }} style={{ width: 80, height: 80 }} tintColor={'black'} />
          </View>
        ) : null}
        {renderIcons()}
        <ScrollView
          horizontal={true}
          style={{ backgroundColor: screenSectionBackgroundColor, position: 'absolute', width: '100%', bottom: 0 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 5,
            }}
          >
            <FilterOptionTab
              label='Arts & Crafts'
              value={'artsAndCrafts'}
              icon={<MaterialIcons name='color-lens' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('artsAndCrafts')}
            />
            <FilterOptionTab
              label='Animes'
              value='animes'
              icon={<MaterialCommunityIcons name='pokeball' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('animes')}
            />
            <FilterOptionTab
              label='Apps'
              value='apps'
              icon={<MaterialCommunityIcons name='instagram' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('apps')}
            />
            <FilterOptionTab
              label='Books'
              value='books'
              icon={<Entypo name='book' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('books')}
            />
            <FilterOptionTab
              label='Business & Finance'
              value='businessAndFinance'
              icon={<MaterialCommunityIcons name='finance' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('businessAndFinance')}
            />
            <FilterOptionTab
              label='Vehicles'
              value='vehicles'
              icon={<MaterialCommunityIcons name='motorbike' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('vehicles')}
            />
            <FilterOptionTab
              label='Dancing'
              value='dancing'
              icon={<MaterialCommunityIcons name='dance-ballroom' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('dancing')}
            />
            <FilterOptionTab
              label='Education'
              value='education'
              icon={<Entypo name='graduation-cap' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('education')}
            />
            <FilterOptionTab
              label='Brands'
              value='brands'
              icon={<MaterialCommunityIcons name='star' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('brands')}
            />
            <FilterOptionTab
              label='Fashion & Beauty'
              value='fashionAndBeauty'
              icon={<MaterialCommunityIcons name='shopping' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('fashionAndBeauty')}
            />
            <FilterOptionTab
              label='Foods & Drinks'
              value='foodsAndDrinks'
              icon={<MaterialCommunityIcons name='food' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('foodsAndDrinks')}
            />
            <FilterOptionTab
              label='People'
              value='people'
              icon={<MaterialCommunityIcons name='account' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('people')}
            />
            <FilterOptionTab
              label='Gamings'
              value='gamings'
              icon={<MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('gamings')}
            />
            <FilterOptionTab
              label='Languages & Ethnic'
              value='languagesAndEthnic'
              icon={<Entypo name='globe' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('languagesAndEthnic')}
            />
            <FilterOptionTab
              label='Films'
              value='films'
              icon={<Fontisto name='film' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('films')}
            />
            <FilterOptionTab
              label='Music'
              value='music'
              icon={<Ionicons name='musical-notes' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('music')}
            />
            <FilterOptionTab
              label='Video games'
              value='videoGames'
              icon={<Ionicons name='ios-game-controller' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('videoGames')}
            />
            <FilterOptionTab
              label='Sports & Outdoors'
              value='sportsAndOutdoors'
              icon={<Ionicons name='basketball' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('sportsAndOutdoors')}
            />
            <FilterOptionTab
              label='Tech'
              value='tech'
              icon={<Entypo name='code' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('tech')}
            />
            <FilterOptionTab
              label='Pets & Animals'
              value='petsAndAnimals'
              icon={<MaterialIcons name='pets' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('petsAndAnimals')}
            />
            <FilterOptionTab
              label='Photography'
              value='photography'
              icon={<Fontisto name='photograph' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('photography')}
            />
            <FilterOptionTab
              label='Writings'
              value='writings'
              icon={<Ionicons name='pencil' size={25} color={'white'} />}
              onFilterOptionPress={() => setSelectedFilterOption('writings')}
            />
          </View>
        </ScrollView>
      </View>
    </IconPickerContext.Provider>
  );
};

export default Container;
