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
import Home from './Home';
import Sports from './Sports';

// ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

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
  const [selectedFilterOption, setSelectedFilterOption] = useState('animals');

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
    animals: [],
    animeAndFilms: [],
    apps: [],
    art: [],
    businessAndFinance: [],
    cultureAndLanguage: [],
    education: [],
    emotion: [],
    fashionAndBeauty: [],
    foodsAndDrink: [],
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

  const getBadges = async () => {
    const result = await lampostAPI.post(`/badges`, { filterOption: selectedFilterOption });
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

  // ADD_USER_BADGESの時のcomponent
  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
      setFromComponent('ADD_USER_BADGES');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => onDoneAddUserBadgesPress()}
            disabled={Object.keys(selectedUserBadges).length ? false : true}
          >
            <Text style={{ color: Object.keys(selectedUserBadges).length ? 'white' : baseTextColor, fontSize: 20 }}>
              Done
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [selectedUserBadges]);
  const onDoneAddUserBadgesPress = async () => {
    // api requestではbadge idsとuserIdをpost dataとして送るのはよし。client側では、単純にbadge dataを送るだけでいい。
    setLoading(true);
    const badgeIds = Object.keys(selectedUserBadges);
    console.log('Sending these badge ids', badgeIds);
    const result = await lampostAPI.post(`/badgeanduserrelationships/${auth.data._id}`, { badgeIds });
    const newBadgeDatas = Object.values(selectedUserBadges).map((selectedUserBadge) => {
      return {
        badge: selectedUserBadge,
        badgeTags: [],
        link: '',
      };
    });
    props.navigation.navigate('Profile', { userId: auth.data._id, addedUserBadges: newBadgeDatas });
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
          <TouchableOpacity onPress={() => onAddMeetupBadgesDone()}>
            <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedMeetupBadges]);
  // うん。上でやると、useEffectでstackoverflow的なことが起こっている。だから下で分けてやる必要がありそう。

  // launch meetupから来た既に選択済みのmeetup badgesがここのcomponentに送られ、それをそのままcomponentのstateにセットする。
  // 上のuseEffectでこれをやるとstackoverflowを起こす。だから、これで分けている。
  useEffect(() => {
    if (props.route.params?.addedMeetupBadges) {
      setAddedMeetupBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedMeetupBadges,
        };
      });
    }
  }, []);
  const onAddMeetupBadgesDone = () => {
    props.navigation.navigate('Map', { addedMeetupBadges });
  };

  // ADD_LIBRARY_BADGESの時。
  useEffect(() => {
    if (props.route.params?.fromComponent === 'ADD_LIBRARY_BADGES') {
      setFromComponent('ADD_LIBRARY_BADGES');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onAddLibraryBadgesDone()}>
            <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedLibraryBadges]);

  useEffect(() => {
    if (props.route.params?.addedLibraryBadges) {
      setAddedLibraryBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedLibraryBadges,
        };
      });
    }
  }, []);
  const onAddLibraryBadgesDone = () => {
    props.navigation.navigate('Libraries', { addedLibraryBadges });
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
                // borderWidth: 1,
                // borderRadius: 5,
                // padding: 4,
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
          <Text style={{ color: baseTextColor }}>Already added</Text>
          <ScrollView horizontal={true}>{list}</ScrollView>
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
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {/* <Badges />
       
        <LoadingSpinner /> */}
        <View style={{ height: 70, padding: 10 }}>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            <FilterOption
              label='Animals & Pets'
              value={'animals'}
              icon={<MaterialCommunityIcons name='dog' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animals')}
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
              icon={<MaterialCommunityIcons name='finance' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Culture & Language'
              icon={<Ionicons name='earth' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Education'
              icon={<Entypo name='graduation-cap' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Emotion'
              icon={
                <MaterialCommunityIcons
                  name='emoticon-lol-outline'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Fashion & Beauty'
              icon={
                <MaterialCommunityIcons
                  name='emoticon-lol-outline'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Foods & Drinks'
              icon={<MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Gadgets & Cars'
              icon={<Ionicons name='car-sport' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Games & Toy'
              icon={<MaterialCommunityIcons name='chess-pawn' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Literature'
              icon={
                <MaterialCommunityIcons
                  name='book-open-blank-variant'
                  size={25}
                  color={'white'}
                  style={{ marginRight: 10 }}
                />
              }
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Music'
              icon={<Ionicons name='musical-notes' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Nature & Vegitables'
              icon={
                <MaterialCommunityIcons name='fruit-cherries' size={25} color={'white'} style={{ marginRight: 10 }} />
              }
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Personality'
              icon={<Ionicons name='heart' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Professions'
              icon={<MaterialCommunityIcons name='doctor' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Sports'
              icon={<Ionicons name='basketball' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Tech & Science'
              icon={<Entypo name='code' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
            <FilterOption
              label='Travel & Outdoor'
              icon={<MaterialCommunityIcons name='hiking' size={25} color={'white'} style={{ marginRight: 10 }} />}
              onFilterOptionPress={() => setSelectedFilterOption('animalsAndPets')}
            />
          </ScrollView>
        </View>
        <View style={{ padding: 10, borderRadius: 15 }}>{renderAddedBadges()}</View>
        <Badges />
        {/* {renderBs()} */}
        {/* <View style={{ height: 200, width: '100%', backgroundColor: 'blue', position: 'absolute', bottom: 0 }}>
          <Text style={{ color: 'red' }}>Currently selected</Text>
        </View> */}
        <BadgeDetailBottomSheet />
      </View>
    </AddBadgesContext.Provider>
  );
};

export default Container;
