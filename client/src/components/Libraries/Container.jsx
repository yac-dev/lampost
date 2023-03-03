import React, { useRef, useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContext from '../../GlobalContext';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, Platform } from 'react-native';
import lampostAPI from '../../apis/lampost';
import {
  baseBackgroundColor,
  baseBorderColor,
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  rnDefaultBackgroundColor,
} from '../../utils/colorsTable';

import BadgeLabel from '../Utils/BadgeLabel';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Library from './Library';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import MyLibrariesBottomSheet from './MyLibrariesBottomSheet/Container';
import CreateLibraryBottomSheet from './CreateLibraryBottomSheet/Container';
import LibraryOverviewBottomSheet from './LibraryOverviewBottomSheet/Container';
// import InfoDetailBottomSheet from './InfoDetailBottomSheet/Container';
import ConfirmCancelCreatingLibraryModal from './ConfirmCancelCreatingLibraryModal';

// authenticatedの場合が必要か。
const Container = (props) => {
  const {
    auth,
    setSnackBar,
    schedulePushNotification,
    expoPushToken,
    setExpoPushToken,
    notification,
    setNotification,
  } = useContext(GlobalContext);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [libraryAssets, setLibraryAssets] = useState([]);
  const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);
  const [selectedLibraryDetailComponent, setSelectedLibraryDetailComponent] = useState('');
  const [isConfirmCancelCreatingLibraryModalOpen, setIsConfirmCancelCreatingLibraryModalOpen] = useState(false);

  const appMenuBottomSheetRef = useRef(null);
  const myLibrariesBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);
  const selectedLibraryDetailComponentBottomSheetRef = useRef(null);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 4 : Dimensions.get('window').height / 3.2;
  const libraryContainerWidth = oneGridWidth * 0.85;
  const libraryIconWidth = libraryContainerWidth * 0.4;

  const experimentSendPushNotification = async () => {
    const pushNotificationObject = {
      to: 'ExponentPushToken[rl0CZGA2qvVsWqorA1rqGG]',
      title: 'Sent by my lampost backend server',
      body: 'This push notification was sent by a Lampost.',
      data: { message: 'Did you get this?' },
    };

    const result = await lampostAPI.post('/lab', { pushToken: 'ExponentPushToken[rl0CZGA2qvVsWqorA1rqGG]' });
  };

  const getLibraries = async () => {
    const result = await lampostAPI.get('/libraries');
    const { libraries } = result.data;
    setLibraries(libraries);
  };

  // console.log(libraries);

  useFocusEffect(
    React.useCallback(() => {
      getLibraries();
    }, [])
  );

  // useEffect(() => {
  //   if (auth.socket) {
  //     auth.socket.on('CREATED_LIBRARY', (data) => {
  //       setLibraries((previous) => [...previous, data]);
  //       if (data.launcher._id === auth.data._id) {
  //         setSnackBar({
  //           isVisible: true,
  //           message: 'Successfully created my library.',
  //           barType: 'success',
  //           duration: 5000,
  //         });
  //         setMyJoinedLibraries((previous) => [...previous, data]);
  //         createLibraryBottomSheetRef.current.close();
  //       }
  //     });
  //   }
  // }, [auth.socket]);
  //ここで、socketを使う必要ない。

  // libraryから出て行った時用。
  useEffect(() => {
    if (props.route.params?.leftLibraryId) {
      console.log('deleting this library', props.route.params.leftLibraryId);
      setMyJoinedLibraries((previous) => {
        const updating = [...previous];
        const updated = updating.filter((library) => library._id !== props.route.params.leftLibraryId);
        return updated;
      });
      setSnackBar({
        isVisible: true,
        message: 'Left library.',
        barType: 'success',
        duration: 5000,
      });
    }
  }, [props.route.params?.leftLibraryId, props.route.params?.time]);

  const selectLibrary = async (libraryId) => {
    libraryOverviewBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/libraries/${libraryId}`);
    const { library } = result.data;
    setSelectedLibrary(library);
    // const res = await lampostAPI.get(`/libraryandassetrelationships/${libraryId}`);
    // const { assets } = res.data;
    // setLibraryAssets(assets);
  };

  const renderBadgeLabels = (badges) => {
    const badgeLabels = badges.map((badge, index) => {
      return (
        <BadgeLabel
          key={index}
          badgeIcon={badge.icon}
          badgeLableBackgroundColor={backgroundColorsTable[badge.color]}
          badgeIconColor={iconColorsTable[badge.color]}
          labelTextColor={iconColorsTable[badge.color]}
          labelText={badge.name}
        />
      );
    });

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>{badgeLabels}</View>
      </ScrollView>
    );
  };

  const renderLibraries = () => {
    if (libraries.length) {
      const librariesList = libraries.map((library, index) => {
        return (
          <Library key={index} library={library} />
          // <View
          //   key={index}
          //   style={{
          //     width: oneGridWidth,
          //     height: oneGridHeight, // これなんだろね。。。
          //     // aspectRatio: 1,
          //     // padding: 10, // これは単純に、25%幅に対して
          //     // marginBottom: 23,
          //     // backgroundColor: 'white',
          //     // backgroundColor: 'red',
          //     alignItems: 'center',
          //     borderRadius: 5,
          //   }}
          // >
          //   <TouchableOpacity
          //     // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
          //     style={{
          //       width: libraryContainerWidth,
          //       // height: 0,
          //       aspectRatio: 1,
          //       // height: '100%',
          //       // alignItems: 'center', // これと
          //       // justifyContent: 'center', // これで中のimageを上下左右真ん中にする

          //       // backgroundColor: rnDefaultBackgroundColor,
          //       // borderWidth: 0.3,
          //       marginBottom: 10,
          //     }}
          //     onPress={() => selectLibrary(library._id)}
          //     // onPress={() => {
          //     //   badgeDetailBottomSheetRef.current.snapToIndex(0);
          //     //   setPressedBadgeData(badgeData);
          //     //   console.log('hey');
          //     // }}
          //   >
          //     <FastImage
          //       style={{ width: '100%', height: '100%', borderRadius: 5 }}
          //       source={{
          //         uri: library.thumbnail.data,
          //         // priority: FastImage.priority.normal,
          //       }}
          //       resizeMode={FastImage.resizeMode.stretch}
          //     />
          //   </TouchableOpacity>
          //   <Text
          //     numberOfLines={1}
          //     style={{
          //       color: baseTextColor,
          //       fontWeight: 'bold',
          //       alignSelf: 'center',
          //       fontSize: 15,
          //       textAlign: 'center',
          //       // marginBottom: 5,
          //       paddingLeft: 10,
          //       paddingRight: 10,
          //       // borderWidth: 1,
          //       // borderRadius: 5,
          //       // padding: 4,
          //     }}
          //   >
          //     {library.name}
          //   </Text>
          // </View>
        );
      });

      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{librariesList}</View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor, textAlign: 'center' }}>
            You'll see all the libraries which were created.
          </Text>
        </View>
      );
    }
  };

  return (
    <LibrariesContext.Provider
      value={{
        appMenuBottomSheetRef,
        myLibrariesBottomSheetRef,
        createLibraryBottomSheetRef,
        libraryOverviewBottomSheetRef,
        selectedLibraryDetailComponentBottomSheetRef,
        libraries,
        setLibraries,
        navigation: props.navigation,
        route: props.route,
        selectedLibrary,
        setSelectedLibrary,
        selectLibrary,
        libraryAssets,
        setLibraryAssets,
        myJoinedLibraries,
        setMyJoinedLibraries,
        selectedLibraryDetailComponent,
        setSelectedLibraryDetailComponent,
        isConfirmCancelCreatingLibraryModalOpen,
        setIsConfirmCancelCreatingLibraryModalOpen,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', padding: 10, color: 'white', marginBottom: 10 }}>
          Recently created
        </Text>

        {renderLibraries()}
        {auth.isAuthenticated ? (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              backgroundColor: backgroundColorsTable['blue1'],
              borderRadius: 10,
              alignSelf: 'center',
              padding: 10,
              // elevation: 5,
              // shadowColor: '#000',
              // shadowOffset: { width: 0, height: 0 },
              // shadowOpacity: 0.1,
              // shadowRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['blue1'],
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
                backgroundColor: iconColorsTable['blue1'],
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => myLibrariesBottomSheetRef.current.snapToIndex(0)}
            >
              <Ionicons name='ios-library' size={25} color={'white'} />
            </TouchableOpacity>
          </View>
        ) : null}

        <AppMenuBottomSheet />
        <MyLibrariesBottomSheet />
        <CreateLibraryBottomSheet />
        <LibraryOverviewBottomSheet />

        {/* <InfoDetailBottomSheet /> */}
        <ConfirmCancelCreatingLibraryModal />
      </View>
    </LibrariesContext.Provider>
  );
};

export default Container;

{
  /* <TouchableOpacity
  key={index}
  style={{ borderBottomWidth: 0.6, padding: 20, borderBottomColor: baseBorderColor }}
  onPress={() => selectLibrary(library._id)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 17, color: baseTextColor }}>{library.name}</Text>
    <Text>Launched at Sep 14 2022</Text>
  </View>
  <ScrollView style={{ marginBottom: 15 }} horizontal={true}>
    {renderBadgeLabels(library.badges)}
  </ScrollView>
  <Text style={{ color: baseTextColor, marginBottom: 15 }}>{library.description}</Text>
  <Text style={{ alignSelf: 'flex-end', color: baseTextColor }}>Launched by {library.launcher.name}</Text>
</TouchableOpacity>; */
}
