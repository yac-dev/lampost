import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AddBadgesContext from './AddBadgesContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// components
import Badges from './Badges/Container';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';
import LoadingSpinner from '../LoadingSpinner';
import FilterOption from './FilterOption';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
  const { auth, setLoading, isIpad } = useContext(GlobalContext);
  const [meetupBadges, setMeetupBadges] = useState({});
  const [fromComponent, setFromComponent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queriedBadges, setQueriedBadges] = useState([]);
  const [queryType, setQueryType] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(null);
  const [selectedUserBadges, setSelectedUserBadges] = useState({});
  const [addedMeetupBadges, setAddedMeetupBadges] = useState({});
  const [addedLibraryBadges, setAddedLibraryBadges] = useState({});
  const [selectedMeetupBadges, setSelectedMeetupBadges] = useState({});
  const [tappedBadge, setTappedBadge] = useState(null);
  const [tappedBadgeHolders, setTappedBadgeHolders] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState('artsAndCrafts');

  const searchBadgeBottomSheetRef = useRef(null);
  const badgeDetailBottomSheetRef = useRef(null);
  const [addedBadges, setAddedBadges] = useState({});
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;

  // 基本、hash tableにdataをためて、render時にarrayに変えて表示する。
  // genreのbadgeが既にある場合は、queryしない。
  const [badges, setBadges] = useState({
    artsAndCrafts: [],
    animeAndFilms: [],
    apps: [],
    art: [],
    businessAndFinance: [],
    cultureAndLanguage: [],
    education: [],
    emotion: [],
    fashionAndBeauty: [],
    foodsAndBeverages: [],
    gadjetsAndCars: [],
    gamesAndToys: [],
    literature: [],
    music: [],
    natureAndVegetables: [],
    personality: [],
    profession: [],
    sports: [],
    techAndScience: [],
    travelsAndOutdoor: [],
  });
  const [myBadges, setMyBadges] = useState({});

  const getBadges = async () => {
    const result = await lampostAPI.get(
      `/badgetypeandbadgerelationships/${filterTypeIdsTable[selectedFilterOption]['_id']}`
    );
    const { badges } = result.data;
    setBadges((previous) => {
      const updating = { ...previous };
      updating[selectedFilterOption] = badges;
      return updating;
    });
  };

  useEffect(() => {
    if (!badges[selectedFilterOption].length) {
      getBadges();
    }
  }, [selectedFilterOption]);
  // console.log(selectedFilterOption);

  // ADD_USER_BADGESの時のcomponent
  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
      setFromComponent('ADD_USER_BADGES');
      setMyBadges(props.route.params.myBadges);
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => onDoneAddUserBadgesPress()}
            disabled={Object.keys(addedBadges).length ? false : true}
          >
            <Text
              style={{ color: Object.keys(addedBadges).length ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}
            >
              Done
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedBadges]);
  const onDoneAddUserBadgesPress = async () => {
    // api requestではbadge idsとuserIdをpost dataとして送るのはよし。client側では、単純にbadge dataを送るだけでいい。
    setLoading(true);
    const badgeIds = Object.keys(addedBadges);
    console.log('Sending these badge ids', badgeIds);
    const result = await lampostAPI.post(`/badgeanduserrelationships/${auth.data._id}`, { badgeIds });
    // const newBadgeDatas = Object.values(addedBadges).map((addedBadge) => {
    //   return {
    //     badge: addedBadge,
    //     badgeTags: [],
    //     link: '',
    //   };
    // });
    // ここのNon-serializable values were found in the navigation state(Circular reference)は、よく分からない。何が起こっているか。
    // arrayでやってたときはこんなエラー別に出なかったのに。まあ、jsonにしたらエラーは消えたけど。
    props.navigation.navigate('Profile', { userId: auth.data._id, addedUserBadges: JSON.stringify(addedBadges) });
    setLoading(false);
  };

  // ADD_MEETUP_BADGESの時。
  useEffect(() => {
    if (props.route.params?.fromComponent === 'ADD_MEETUP_BADGES') {
      setFromComponent('ADD_MEETUP_BADGES');
      // setRequiredBadges((previous) => {
      //   return {
      //     ...previous,
      //     ...props.route.params.badges,
      //   };
      // });
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => onAddMeetupBadgesDone()}
            disabled={Object.keys(addedBadges).length ? false : true}
          >
            <Text
              style={{ color: Object.keys(addedBadges).length ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}
            >
              Done
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedBadges]);
  // うん。上でやると、useEffectでstackoverflow的なことが起こっている。だから下で分けてやる必要がありそう。

  // launch meetupから来た既に選択済みのmeetup badgesがここのcomponentに送られ、それをそのままcomponentのstateにセットする。
  // 上のuseEffectでこれをやるとstackoverflowを起こす。だから、これで分けている。
  useEffect(() => {
    if (props.route.params?.addedMeetupBadges) {
      setAddedBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedMeetupBadges,
        };
      });
    }
  }, []);
  const onAddMeetupBadgesDone = () => {
    props.navigation.navigate('Map', { addedMeetupBadges: addedBadges });
  };

  // ADD_LIBRARY_BADGESの時。
  useEffect(() => {
    if (props.route.params?.fromComponent === 'ADD_LIBRARY_BADGES') {
      setFromComponent('ADD_LIBRARY_BADGES');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => onAddLibraryBadgesDone()}
            disabled={Object.keys(addedBadges).length ? false : true}
          >
            <Text
              style={{ color: Object.keys(addedBadges).length ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}
            >
              Done
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedBadges]);

  useEffect(() => {
    if (props.route.params?.addedLibraryBadges) {
      setAddedBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedLibraryBadges,
        };
      });
    }
  }, []);
  const onAddLibraryBadgesDone = () => {
    props.navigation.navigate('Libraries', { addedLibraryBadges: addedBadges });
  };

  // query
  // useEffect(() => {
  //   if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
  //     queryBadges(auth.data._id);
  //   } else if (props.route.params.fromComponent === 'ADD_MEETUP_BADGES') {
  //     queryBadges();
  //   } else if (props.route.params.fromComponent === 'ADD_LIBRARY_BADGES') {
  //     queryBadges();
  //   }
  // }, [queryType]);

  // const queryBadges = async (userId) => {
  //   let postBody = { userId: '' };
  //   if (userId) {
  //     postBody['userId'] = userId;
  //   }
  //   let queryString = '?page=1';
  //   const queryTypes = [...queryType];
  //   for (let i = 0; i < queryTypes.length; i++) {
  //     // if (i === 0) {
  //     //   queryString = '?type=' + queryTypes[i];
  //     // } else {
  //     queryString = queryString + '&type=' + queryTypes[i];
  //     // }
  //   }
  //   // console.log(queryString);
  //   const result = await lampostAPI.post(`/badges/${queryString}`, postBody);
  //   const { badges } = result.data;
  //   setQueriedBadges(badges);
  //   setPage(2);
  // };

  // あとは、これをbadgeとremove buttonをつける感じだ。
  const renderAddedBadges = () => {
    const addedBadgesList = Object.values(addedBadges);
    if (addedBadgesList.length) {
      const list = addedBadgesList.map((badge, index) => {
        return (
          <View
            key={index}
            style={{
              width: oneGridWidth,
              height: oneGridHeight, // これなんだろね。。。
              alignItems: 'center',
              // backgroundColor: 'red',
              paddingTop: 10,
            }}
          >
            <View
              // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
              style={{
                width: badgeContainerWidth,
                aspectRatio: 1,
                alignItems: 'center', // これと
                justifyContent: 'center', // これで中のimageを上下左右真ん中にする
                borderRadius: 15,
                backgroundColor: rnDefaultBackgroundColor,
                borderWidth: 0.3,
                marginBottom: 5,
              }}
              onPress={() => {
                // onBadgePress();
                setAddedBadges((previous) => {
                  return {
                    ...previous,
                    [badge._id]: badge,
                  };
                });
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: backgroundColorsTable[badge.color],
                  borderWidth: 0.3,
                  borderColor: backgroundColorsTable[badge.color],
                }}
              >
                <FastImage
                  style={{ height: badgeIconWidth, width: badgeIconWidth }}
                  source={{
                    uri: badge.icon,
                    priority: FastImage.priority.normal,
                  }}
                  tintColor={iconColorsTable[badge.color]}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: rnDefaultBackgroundColor,
                    top: -5,
                    right: -5,
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    setAddedBadges((previous) => {
                      const updating = { ...previous };
                      delete updating[badge._id];
                      return updating;
                    })
                  }
                >
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,

                      backgroundColor: iconColorsTable['red1'],
                    }}
                  >
                    <View>
                      <Ionicons name='remove' size={20} color={'white'} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                color: baseTextColor,
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {badge.name}
            </Text>
          </View>
        );
      });
      return (
        <View
          style={{
            height: 150,
            width: '100%',
            padding: 10,
            backgroundColor: screenSectionBackgroundColor,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Adding badges</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {list}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <AddBadgesContext.Provider
      value={{
        fromComponent,
        queriedBadges,
        selectedUserBadges,
        setSelectedUserBadges,
        addedMeetupBadges,
        setAddedMeetupBadges,
        addedLibraryBadges,
        setAddedLibraryBadges,
        badgeDetailBottomSheetRef,
        searchBadgeBottomSheetRef,
        searchQuery,
        setSearchQuery,
        queryType,
        setQueryType,
        tappedBadge,
        setTappedBadge,
        tappedBadgeHolders,
        setTappedBadgeHolders,
        selectedFilterOption,
        setSelectedFilterOption,
        badges,
        setBadges,
        addedBadges,
        setAddedBadges,
        myBadges,
        setMyBadges,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <View style={{ height: 70, padding: 10 }}>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            <FilterOption
              label='Arts & Crafts'
              value={'artsAndCrafts'}
              icon={<MaterialCommunityIcons name='dog' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('artsAndCrafts')}
            />
            <FilterOption
              label='Anime & Films'
              value='animeAndFilms'
              icon={<MaterialCommunityIcons name='filmstrip' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animeAndFilms')}
            />
            <FilterOption
              label='Apps'
              value='apps'
              icon={<MaterialCommunityIcons name='instagram' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('apps')}
            />
            <FilterOption
              label='Art'
              value='art'
              icon={<MaterialIcons name='color-lens' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('art')}
            />
            <FilterOption
              label='Business & Finance'
              value='businessAndFinance'
              icon={<MaterialCommunityIcons name='finance' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('businessAndFinance')}
            />
            <FilterOption
              label='Culture & Language'
              value='cultureAndLanguage'
              icon={<Ionicons name='earth' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('cultureAndLanguage')}
            />
            <FilterOption
              label='Education'
              value='education'
              icon={<Entypo name='graduation-cap' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('education')}
            />
            <FilterOption
              label='Emotion'
              value='emotion'
              icon={
                <MaterialCommunityIcons
                  name='emoticon-lol-outline'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('emotion')}
            />
            <FilterOption
              label='Fashion & Beauty'
              value='fashionAndBeauty'
              icon={
                <MaterialCommunityIcons
                  name='emoticon-lol-outline'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('fashionAndBeauty')}
            />
            <FilterOption
              label='Foods & Drinks'
              value='foodsAndBeverages'
              icon={<MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('foodsAndBeverages')}
            />
            <FilterOption
              label='Gadgets & Cars'
              value='gadjetsAndCars'
              icon={<Ionicons name='car-sport' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('gadjetsAndCars')}
            />
            <FilterOption
              label='Games & Toy'
              value='gamesAndToys'
              icon={<MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('gamesAndToys')}
            />
            <FilterOption
              label='Literature'
              value='literature'
              icon={
                <MaterialCommunityIcons
                  name='book-open-blank-variant'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('literature')}
            />
            <FilterOption
              label='Music'
              value='music'
              icon={<Ionicons name='musical-notes' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('music')}
            />
            <FilterOption
              label='Nature & Vegitables'
              value='natureAndVegetables'
              icon={
                <MaterialCommunityIcons name='fruit-cherries' size={25} color={'white'} style={{ marginRight: 10 }} />
              }
              onFilterOptionPress={() => setSelectedFilterOption('natureAndVegetables')}
            />
            <FilterOption
              label='Personality'
              value='personality'
              icon={<Ionicons name='heart' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('personality')}
            />
            <FilterOption
              label='Professions'
              value='profession'
              icon={<MaterialCommunityIcons name='doctor' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('profession')}
            />
            <FilterOption
              label='Sports'
              value='sports'
              icon={<Ionicons name='basketball' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('sports')}
            />
            <FilterOption
              label='Tech & Science'
              value='techAndScience'
              icon={<Entypo name='code' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('techAndScience')}
            />
            <FilterOption
              label='Travel & Outdoor'
              value='travelsAndOutdoor'
              icon={<MaterialCommunityIcons name='hiking' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('travelsAndOutdoor')}
            />
          </ScrollView>
        </View>
        <View style={{ padding: 10, borderRadius: 15 }}>{renderAddedBadges()}</View>
        <Badges />
        {/* <BadgeDetailBottomSheet /> */}
        <LoadingSpinner />
      </View>
    </AddBadgesContext.Provider>
  );
};

export default Container;
