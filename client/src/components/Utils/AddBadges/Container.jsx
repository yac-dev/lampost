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
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
// components
import Badges from './Badges/Container';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';
import LoadingSpinner from '../LoadingSpinner';
import SnackBar from '../SnackBar';
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
  const { auth, setLoading, isIpad, setSnackBar } = useContext(GlobalContext);
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
  const [addingBadgeAccordion, setAddingBadgeAccordion] = useState(true);

  const searchBadgeBottomSheetRef = useRef(null);
  const badgeDetailBottomSheetRef = useRef(null);
  const [addedBadges, setAddedBadges] = useState({});
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;

  console.log(addedBadges);

  // 基本、hash tableにdataをためて、render時にarrayに変えて表示する。
  // genreのbadgeが既にある場合は、queryしない。
  const [badges, setBadges] = useState({
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
    console.log(badges);
  };

  useEffect(() => {
    if (!badges[selectedFilterOption].length) {
      getBadges();
    }
  }, [selectedFilterOption]);
  // console.log(selectedFilterOption);
  // useEffect(() => {
  //   setSnackBar({
  //     isVisible: true,
  //     barType:'warning',
  //     message: "Some icons are not meaningful for its badge now. I'm gonna update little by little. Please bear with me🙏",
  //     duration: 8000
  //   })
  // },[])

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
    // const badgeIds = Object.keys(addedBadges);
    const payload = {
      badges: addedBadges,
    };
    console.log('Sending these badge ids', addedBadges);
    const result = await lampostAPI.post(`/badgeanduserrelationships/${auth.data._id}`, payload);
    // const newBadgeDatas = Object.values(addedBadges).map((addedBadge) => {
    //   return {
    //     badge: addedBadge,
    //     badgeTags: [],
    //     link: '',
    //   };
    // });
    // ここのNon-serializable values were found in the navigation state(Circular reference)は、よく分からない。何が起こっているか。
    // arrayでやってたときはこんなエラー別に出なかったのに。まあ、jsonにしたらエラーは消えたけど。
    const { badgeAndUserRelationships } = result.data;
    props.navigation.navigate('Profile', {
      userId: auth.data._id,
      addedUserBadges: JSON.stringify(badgeAndUserRelationships),
    });
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
    props.navigation.navigate('Launch new meetup', { addedMeetupBadges: addedBadges });
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
    props.navigation.navigate('Create new library', { addedLibraryBadges: addedBadges });
  };

  useEffect(() => {
    if (props.route.params?.createdBadge) {
      setAddedBadges((previous) => {
        return {
          ...previous,
          [props.route.params.createdBadge._id]: props.route.params.createdBadge,
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'New badge have been created successfully.',
        duration: 5000,
      });
      // setBadges((previous) => {
      //   const updating = {...previous}
      //   updating[props.route.params.createdBadge.badgeType].push(props.route.params.createdBadge.badge);
      //   return updating
      // })
    }
  }, [props.route.params?.createdBadge]);

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
                    uri: badge.icon.url,
                    priority: FastImage.priority.normal,
                  }}
                  tintColor={iconColorsTable[badge.color]}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: iconColorsTable['red1'],
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
                  <Feather name='minus' size={20} color={'white'} />
                  {/* <View
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: iconColorsTable['red1'],
                    }}
                  >
                   
                  </View> */}
                </TouchableOpacity>
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={{
                // paddingLeft: 5,
                // paddingRight: 5,
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
            height: addingBadgeAccordion ? 130 : 25,
            width: '100%',
            // padding: 10,
            backgroundColor: screenSectionBackgroundColor,
            borderRadius: 10,
          }}
        >
          {addingBadgeAccordion ? (
            <>
              <View
                style={{
                  paddingLeft: 15,
                  paddingTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginRight: 5 }}>
                    Adding badges
                  </Text>
                  <Text style={{ color: baseTextColor, fontSize: 13 }}>(Press "Done"⬆️ to finish)</Text>
                </View>
                <TouchableOpacity onPress={() => setAddingBadgeAccordion((previous) => !previous)}>
                  <MaterialCommunityIcons
                    name={addingBadgeAccordion ? 'chevron-up' : 'chevron-down'}
                    color={'white'}
                    size={25}
                    style={{ marginRight: 5 }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {list}
              </ScrollView>
            </>
          ) : (
            <TouchableOpacity onPress={() => setAddingBadgeAccordion((previous) => !previous)}>
              <MaterialCommunityIcons
                name={addingBadgeAccordion ? 'chevron-up' : 'chevron-down'}
                color={'white'}
                size={25}
                style={{ marginRight: 5, alignSelf: 'flex-end' }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return null;
    }
  };
  // setAddingBadgeAccordion

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
        {/* <Text style={{ color: 'white', paddingTop: 10, paddingRight: 10, paddingLeft: 10 }}>
          🤔 If you can't find your topics or interests here, please close this page and then go to "Create badge" to
          make the unique badge.
        </Text> */}
        <View style={{ padding: 10 }}>
          {/* <TouchableOpacity
            style={{ marginBottom: 5, alignSelf: 'flex-end' }}
            onPress={() => props.navigation.navigate('What is Badge')}
          >
            <Text style={{ color: 'white' }}>What is badge by the way?</Text>
          </TouchableOpacity> */}
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            <FilterOption
              label='Arts & Crafts'
              value={'artsAndCrafts'}
              icon={<MaterialIcons name='color-lens' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('artsAndCrafts')}
            />
            <FilterOption
              label='Animes'
              value='animes'
              icon={<MaterialCommunityIcons name='pokeball' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animes')}
            />
            <FilterOption
              label='Apps'
              value='apps'
              icon={<MaterialCommunityIcons name='instagram' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('apps')}
            />
            <FilterOption
              label='Books'
              value='books'
              icon={<Entypo name='book' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('books')}
            />
            <FilterOption
              label='Business & Finance'
              value='businessAndFinance'
              icon={<MaterialCommunityIcons name='finance' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('businessAndFinance')}
            />
            <FilterOption
              label='Vehicles'
              value='vehicles'
              icon={<MaterialCommunityIcons name='motorbike' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('vehicles')}
            />
            <FilterOption
              label='Dancing'
              value='dancing'
              icon={
                <MaterialCommunityIcons name='dance-ballroom' size={25} color={'white'} style={{ marginRight: 5 }} />
              }
              onFilterOptionPress={() => setSelectedFilterOption('dancing')}
            />
            <FilterOption
              label='Education'
              value='education'
              icon={<Entypo name='graduation-cap' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('education')}
            />
            <FilterOption
              label='Brands'
              value='brands'
              icon={<MaterialCommunityIcons name='star' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('brands')}
            />
            <FilterOption
              label='Fashion & Beauty'
              value='fashionAndBeauty'
              icon={<MaterialCommunityIcons name='shopping' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('fashionAndBeauty')}
            />
            <FilterOption
              label='Foods & Drinks'
              value='foodsAndDrinks'
              icon={<MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('foodsAndDrinks')}
            />
            <FilterOption
              label='People'
              value='people'
              icon={<MaterialCommunityIcons name='account' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('people')}
            />
            {/* <FilterOption
              label='Fitness & Health'
              value='fitnessAndHealth'
              icon={<Ionicons name='fitness' size={25} color={'white'} style={{ marginRight:5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('fitnessAndHealth')}
            /> */}
            <FilterOption
              label='Gamings'
              value='gamings'
              icon={<MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('gamings')}
            />
            <FilterOption
              label='Languages & Ethnic'
              value='languagesAndEthnic'
              icon={<Entypo name='globe' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('languagesAndEthnic')}
            />
            <FilterOption
              label='Films'
              value='films'
              icon={<Fontisto name='film' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('films')}
            />
            <FilterOption
              label='Music'
              value='music'
              icon={<Ionicons name='musical-notes' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('music')}
            />
            {/* <FilterOption
              label='Spirituality'
              value='spirituality'
              icon={<MaterialCommunityIcons name='ufo-outline' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('spirituality')}
            /> */}
            {/* <FilterOption
              label='Family'
              value='family'
              icon={<MaterialIcons name='family-restroom' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('family')}
            /> */}
            <FilterOption
              label='Video games'
              value='videoGames'
              icon={<Ionicons name='ios-game-controller' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('videoGames')}
            />
            <FilterOption
              label='Sports & Outdoors'
              value='sportsAndOutdoors'
              icon={<Ionicons name='basketball' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('sportsAndOutdoors')}
            />
            <FilterOption
              label='Tech'
              value='tech'
              icon={<Entypo name='code' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('tech')}
            />
            {/* <FilterOption
              label='Outdoors'
              value='outdoors'
              icon={<MaterialCommunityIcons name='hiking' size={25} color={'white'} style={{ marginRight:5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('outdoors')}
            /> */}
            <FilterOption
              label='Pets & Animals'
              value='petsAndAnimals'
              icon={<MaterialIcons name='pets' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('petsAndAnimals')}
            />
            <FilterOption
              label='Photography'
              value='photography'
              icon={<Fontisto name='photograph' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('photography')}
            />
            <FilterOption
              label='Writings'
              value='writings'
              icon={<Ionicons name='pencil' size={25} color={'white'} style={{ marginRight: 5 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('writings')}
            />
          </ScrollView>
        </View>
        {Object.values(addedBadges).length ? <View style={{}}>{renderAddedBadges()}</View> : null}

        <Badges />
        {props.route.params.fromComponent === 'ADD_USER_BADGES' ? (
          <View style={{ paddingLeft: 10, paddingRight: 10, width: '100%' }}>
            <TouchableOpacity
              style={{ backgroundColor: iconColorsTable['blue1'], padding: 10, borderRadius: 7 }}
              onPress={() => props.navigation.navigate('Create badge')}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Create new?</Text>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Could't find your topics above? Let's create your original one here.
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* <BadgeDetailBottomSheet /> */}
        <LoadingSpinner />
        <SnackBar />
      </View>
    </AddBadgesContext.Provider>
  );
};

export default Container;
