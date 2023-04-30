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
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
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
  // {2023-5: {3: assetObj , 4: assetObj, 5: assetObj}} って感じか。

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.libraryTitle,
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => onPostPress()} disabled={addedAsset ? false : true}>
      //     <Text style={{ color: addedAsset ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}>Post</Text>
      //   </TouchableOpacity>
      // ),
    });
  }, []);

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
          message: 'Success',
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

  const getAssetsByYearAndMonth = async () => {
    const result = await lampostAPI.get(
      `/libraryandassetrelationships/${props.route.params.libraryId}?yearAndMonth=${currentYearAndMonth}`
    );
    const { libraryAssets } = result.data;
    const table = {};
    libraryAssets.forEach((libraryAsset) => {
      const date = new Date(libraryAsset.createdAt).toISOString().substring(0, 10);
      // const dayOfMonth = date.getDate();
      if (!table[date]) {
        table[date] = { marked: true, thumbnail: libraryAsset.asset.data, libraryId: libraryAsset.library };
      }
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
            onPress={() => props.navigation.navigate('Date assets', { libraryId: marking.libraryId, date: date })}
          >
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
              source={{
                uri: marking.thumbnail,
              }}
            />
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
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Calendar
          style={{
            width: '100%',
            aspectRatio: 1,
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
        {/* <View>
          <Text style={{ color: 'red' }}>Helloooo</Text>
        </View> */}
        {auth.isAuthenticated ? (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              backgroundColor: backgroundColorsTable['yellow1'],
              borderRadius: 10,
              alignSelf: 'center',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['yellow1'],
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
            >
              <Ionicons name='ios-apps' size={25} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['yellow1'],
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => albumsBottomSheetRef.current.snapToIndex(0)}
            >
              <MaterialCommunityIcons name='image-album' size={25} color={'white'} />
            </TouchableOpacity>
          </View>
        ) : null}
        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Page1')}>
          <Text style={{ color: 'red' }}>He</Text>
        </TouchableOpacity> */}

        <AppMenuBottomSheet />
        {/* <AlbumsBottomSheet /> */}
        <ConfirmLeaveLibrary />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
