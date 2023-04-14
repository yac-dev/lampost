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
import AlbumsBottomSheet from './AlbumsBottomSheet/Container';
import MembersBottomSheet from './MembersBottomSheet';
import Header from './Header';
import BadgeLabels from './BadgeLabels';
import Description from './Description';
import ConfirmLeaveLibrary from './ConfirmLeaveLibrary';
import ConfirmPostAssetModal from './ConfirmPostAssetModal';

const videoTypesTable = {
  normal: 'none',
  olive: 'green1',
  ocean: 'blue1',
  camel: 'red1',
  sepia: 'yellow1',
};

const cameraTypesTable = {
  normal: '',
};

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
  const { auth, isIpad } = useContext(GlobalContext);
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
    if (props.route.params?.addedAsset) {
      setAssets((previous) => [...previous, props.route.params?.addedAsset]);
    }
  }, [props.route.params?.addedAsset]);

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
      const date = new Date(libraryAsset.asset.createdAt).toISOString().substring(0, 10);
      // const dayOfMonth = date.getDate();
      if (!table[date]) {
        table[date] = { marked: true, thumbnail: libraryAsset.asset.data };
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
    // const { thumbnail } = marking;
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '100%',
          aspectRatio: 1,
          paddingRight: 2,
          paddingLeft: 2,
          borderRadius: 5,
          marginTop: 0,
          marginBottom: 0,
        }}
        onPress={() =>
          props.navigation.navigate('Date assets', { libraryId: props.route.params.libraryId, date: date })
        }
      >
        {marking ? (
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{
              uri: marking.thumbnail,
            }}
          />
        ) : // <View
        //   style={{
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: baseBackgroundColor,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //   }}
        // ></View>
        null}

        <Text style={{ color: 'white', position: 'absolute', top: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {date.day}
        </Text>
      </TouchableOpacity>
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

  const renderItem = useCallback((asset) => {
    if (asset.type === 'photo') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => {
            props.navigation.navigate('Asset', {
              asset: asset,
              libraryId: props.route.params.libraryId,
              assetType: asset.type,
            });
          }}
        >
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='camera' size={25} color={'white'} />
          </View>
        </TouchableOpacity>
      );
    } else if (asset.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => {
            props.navigation.navigate('Asset', {
              asset: asset,
              libraryId: props.route.params.libraryId,
              assetType: asset.type,
            });
          }}
        >
          <Video
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
            }}
            useNativeControls={false}
            resizeMode='stretch'
            isLooping={false}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[asset.effect]]} />
          </View>
        </TouchableOpacity>
      );
    }
  }, []);

  //   <View style={{ position: 'absolute', top: 10, right: 10 }}>
  //   <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[formData.asset.effect]]} />
  // </View>

  const handleMonthChange = (monthObj) => {
    setCurrentYearAndMonth(`${monthObj.year}-${monthObj.month}`);
  };
  console.log(assetsTable);

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
      {/* <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {!isFetchedAssets ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={2}
            data={assets}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        )}
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

        <AppMenuBottomSheet />
        <AlbumsBottomSheet />
        <ConfirmLeaveLibrary />
        <ConfirmPostAssetModal />
      </View> */}
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
          // renderDay={renderDay}
          dayComponent={DayComponent}
          theme={{
            calendarBackground: baseBackgroundColor,
            textSectionTitleColor: baseTextColor,
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            dayTextColor: 'white',
            arrowColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            textMonthFontWeight: 'bold',
            // 'stylesheet.calendar.dayHeader': {
            //   marginTop: 0,
            //   marginBottom: 0,
            //   width: 50,
            //   textAlign: 'center',
            // },
          }}
        />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
