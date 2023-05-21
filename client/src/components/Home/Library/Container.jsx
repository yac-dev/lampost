import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, FlatList, Image } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import AppMenuBottomSheet from './Menu';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import SnackBar from '../../Utils/SnackBar';
// import AlbumsBottomSheet from './AlbumsBottomSheet/Container';
// import MembersBottomSheet from './MembersBottomSheet';
import Header from './Header';
import BadgeLabels from './BadgeLabels';
import Description from './Description';
import ConfirmLeaveLibrary from './ConfirmLeaveLibrary';
import ConfirmPostAssetModal from './ConfirmPostAssetModal';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

const Container = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, isIpad, setSnackBar } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;
  const appMenuBottomSheetRef = useRef(null);
  const albumsBottomSheetRef = useRef(null);
  const selectedAssetBottomSheetRef = useRef(null);
  const membersBottomSheetRef = useRef(null);
  const reactionsBottomSheetRef = useRef(null);
  const [isLeaveLibraryConfirmationModalOpen, setIsLeaveLibraryConfirmationModalOpen] = useState(false);
  const [isConfirmPostAssetsModalOpen, setIsConfirmPostAssetsModalOpen] = useState(false);
  const [library, setLibrary] = useState(null);
  // const [isFetchedLibrary, setIsFetchedLibrary] = useState(false);
  const [assets, setAssets] = useState([]);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);
  const [libraryMembers, setLibraryMembers] = useState([]);
  const [libraryPosts, setLibraryPosts] = useState([]);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState('');
  const [assetsTable, setAssetsTable] = useState({});
  const [isMenuTapped, setIsMenuTapped] = useState(false);
  // {2023-5: {3: assetObj , 4: assetObj, 5: assetObj}} って感じか。

  useEffect(() => {
    if (props.route.params?.addedAsset) {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const yearMonth = `${year}-${month}`;
      const date = new Date(props.route.params.addedAsset.postedAt).toISOString().substring(0, 10);
      if (!assetsTable[yearMonth][date]) {
        const object = {
          marked: true,
          thumbnail: props.route.params.addedAsset.data,
          libraryId: props.route.params.addedAsset.libraryId,
          type: props.route.params.addedAsset.type,
        };
        setAssetsTable((previous) => {
          return {
            ...previous,
            [yearMonth]: {
              ...previous[yearMonth],
              [date]: object,
            },
          };
        });
        setSnackBar({
          isVisible: true,
          barType: 'success',
          message: 'Your snap has been posted successfully.',
          duration: 5000,
        });
      }
    }
  }, [props.route.params?.addedAsset]);
  console.log(assetsTable);

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const key = `${year}-${month}`;
    setCurrentYearAndMonth(key);
  }, []);

  const getLibrary = async () => {
    const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
    const { library } = result.data;
    setLibrary(library);
  };
  useEffect(() => {
    getLibrary();
  }, []);

  const getAssetsByYearAndMonth = async () => {
    const result = await lampostAPI.get(
      `/libraryandassetrelationships/${props.route.params.libraryId}?yearAndMonth=${currentYearAndMonth}`
    );
    const { libraryAssets } = result.data;
    const table = {};
    libraryAssets.forEach((libraryAsset) => {
      // if (libraryAsset.asset && libraryAsset.asset.createdBy) {
      const date = new Date(libraryAsset.createdAt).toISOString().substring(0, 10);
      // const dayOfMonth = date.getDate();
      if (!table[date]) {
        table[date] = {
          marked: true,
          thumbnail: libraryAsset.asset.data,
          libraryId: libraryAsset.library,
          type: libraryAsset.asset.type,
        };
      }
      // }
    });
    setAssetsTable((previous) => {
      return {
        ...previous,
        [currentYearAndMonth]: table,
      };
    });
  };
  useEffect(() => {
    if (currentYearAndMonth) {
      if (!assetsTable[currentYearAndMonth]) {
        // ここでそのyearとmonthでassetsをfetchしてくる。
        // dataがなかったら、assetsをfetchして、かつassetsTableのdataも貯めると。
        getAssetsByYearAndMonth();
      }
    }
  }, [currentYearAndMonth]);
  // console.log(assetsTable);

  const DayComponent = ({ date, marking }) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '100%',
          aspectRatio: 1,
          paddingRight: 2,
          paddingLeft: 2,
        }}
      >
        {marking ? (
          <TouchableOpacity
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            onPress={() =>
              props.navigation.navigate('Date assets', {
                libraryId: marking.libraryId,
                date: date,
                reactionOptions: library.reactions,
                isCommentAvailable: library.isCommentAvailable,
              })
            }
          >
            {marking.type === 'photo' ? (
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                source={{
                  uri: marking.thumbnail,
                }}
              />
            ) : (
              <Video
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                source={{
                  uri: marking.thumbnail,
                }}
                useNativeControls={false}
                resizeMode='stretch'
                isLooping={false}
              />
            )}
          </TouchableOpacity>
        ) : null}

        <Text style={{ color: 'white', position: 'absolute', top: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {date.day}
        </Text>
      </View>
    );
  };

  // const getLibrary = async () => {
  //   const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
  //   const { library } = result.data;
  //   setLibrary(library);
  //   setIsFetchedLibrary(true);
  // };
  // useEffect(() => {
  //   getLibrary();
  // }, []);

  // const getAssetsByLibraryId = async () => {
  //   const result = await lampostAPI.get(`/libraryandassetrelationships/${props.route.params.libraryId}`);
  //   const { assets } = result.data;
  //   setAssets(assets);
  //   setIsFetchedAssets(true);
  // };
  // useEffect(() => {
  //   // if (library) {
  //   getAssetsByLibraryId();
  //   // }
  // }, []);
  console.log(library);

  const handleMonthChange = (monthObj) => {
    setCurrentYearAndMonth(`${monthObj.year}-${monthObj.month}`);
  };
  return (
    <LibraryContext.Provider
      value={{
        appMenuBottomSheetRef,
        albumsBottomSheetRef,
        selectedAssetBottomSheetRef,
        libraryId: props.route.params.libraryId, // membersの実装
        libraryAssetType: props.route.params.libraryAssetType,
        library,
        assets,
        setAssets,
        libraryMembers,
        setLibraryMembers,
        libraryPosts,
        setLibraryPosts,
        navigation: props.navigation,
        route: props.route,
        isLeaveLibraryConfirmationModalOpen,
        setIsLeaveLibraryConfirmationModalOpen,
        isConfirmPostAssetsModalOpen,
        setIsConfirmPostAssetsModalOpen,
        isMenuTapped,
        setIsMenuTapped,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Calendar
          style={{
            width: '100%',
            // aspectRatio: 1,
          }}
          // horizontal={true}
          locale={'en'}
          markedDates={assetsTable[currentYearAndMonth]}
          onMonthChange={handleMonthChange}
          dayComponent={DayComponent}
          theme={{
            calendarBackground: baseBackgroundColor,
            textSectionTitleColor: baseTextColor,
            dayTextColor: 'white',
            arrowColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            textMonthFontWeight: 'bold',
          }}
        />
        {/* <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            paddingTop: 5,
            paddingBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 7,
            position: 'absolute',
            bottom: 20,
            right: 20,
            alignSelf: 'center',
          }}
          onPress={() => {
            setIsMenuTapped(true);
          }}
        >
          <MaterialCommunityIcons name='lightbulb-on' size={25} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Action</Text>
        </TouchableOpacity> */}
        <ScrollView
          horizontal={true}
          style={{ backgroundColor: screenSectionBackgroundColor, position: 'absolute', width: '100%', bottom: 0 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                width: oneGridWidth,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColorsTable['red1'],
                  padding: 10,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
                onPress={() => {
                  props.navigation.navigate('Post my snap', {
                    libraryId: props.route.params.libraryId,
                    fromComponent: 'ADD_ASSET_FOR_POSTING',
                    assetType: props.route.params.libraryAssetType,
                  });
                }}
              >
                <MaterialCommunityIcons name='plus' size={20} color={iconColorsTable['red1']} />
              </TouchableOpacity>

              <Text style={{ color: 'white', textAlign: 'center' }}>Post</Text>
            </View>
            <View
              style={{
                width: oneGridWidth,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColorsTable['blue1'],
                  padding: 10,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
                onPress={() =>
                  props.navigation.navigate('Invite my friends', { libraryId: props.route.params.libraryId })
                }
              >
                <MaterialCommunityIcons name='human-greeting-variant' size={20} color={iconColorsTable['blue1']} />
              </TouchableOpacity>

              <Text style={{ color: 'white', textAlign: 'center' }}>Invite</Text>
            </View>
            <View
              style={{
                width: oneGridWidth,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColorsTable['yellow1'],
                  padding: 10,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
                onPress={() =>
                  props.navigation.navigate('Home library members', { libraryId: props.route.params.libraryId })
                }
              >
                <MaterialCommunityIcons name='account-group' size={20} color={iconColorsTable['yellow1']} />
              </TouchableOpacity>
              <Text style={{ color: 'white', textAlign: 'center' }}>Members</Text>
            </View>
            <View
              style={{
                width: oneGridWidth,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColorsTable['green1'],
                  padding: 10,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
              >
                <Ionicons name='ios-albums' size={20} color={iconColorsTable['green1']} />
              </TouchableOpacity>
              <Text style={{ color: 'white', textAlign: 'center' }}>Albums</Text>
            </View>
            <View
              style={{
                width: oneGridWidth,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColorsTable['grey1'],
                  padding: 10,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
                onPress={() => props.navigation.navigate('Home library about', { library })}
              >
                <Ionicons name='information-circle' size={20} color={iconColorsTable['grey1']} />
              </TouchableOpacity>
              <Text style={{ color: 'white', textAlign: 'center' }}>About</Text>
            </View>
          </View>
        </ScrollView>
        <ConfirmLeaveLibrary />
      </View>
      <AppMenuBottomSheet />
      <LoadingSpinner />
      <SnackBar />
    </LibraryContext.Provider>
  );
};

export default Container;
