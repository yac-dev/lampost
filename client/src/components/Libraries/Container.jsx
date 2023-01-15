import React, { useRef, useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContext from '../../GlobalContext';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import lampostAPI from '../../apis/lampost';
import {
  baseBackgroundColor,
  baseBorderColor,
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  rnDefaultBackgroundColor,
} from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import BadgeLabel from '../Utils/BadgeLabel';

import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import CreateLibraryBottomSheet from './CreateLibraryBottomSheet/Container';
import LibraryOverviewBottomSheet from './LibraryOverviewBottomSheet/Container';
import InfoDetailBottomSheet from './InfoDetailBottomSheet/Container';

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
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [libraryAssets, setLibraryAssets] = useState([]);
  const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);
  const [selectedLibraryDetailComponent, setSelectedLibraryDetailComponent] = useState('');

  const appMenuBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);
  const selectedLibraryDetailComponentBottomSheetRef = useRef(null);

  const oneGridWidth = Dimensions.get('window').width / 2;
  const oneGridHeight = Dimensions.get('window').height / 3;
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
    const res = await lampostAPI.get(`/libraryandassetrelationships/${libraryId}`);
    const { assets } = res.data;
    setLibraryAssets(assets);
  };

  // const renderDate = (date) => {
  //   const d = new Date(date).toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //   });
  //   const dateTable = { ...d.split(' ') };
  //   return (
  //     <View
  //       style={{
  //         width: 50,
  //         height: 50,
  //         padding: 10,
  //         borderRadius: 10,
  //         borderWidth: 0.3,
  //         marginRight: 10,
  //         borderColor: baseTextColor,
  //       }}
  //     >
  //       <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
  //         {dateTable['0']}
  //       </Text>
  //       <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
  //         {dateTable['1']}
  //       </Text>
  //     </View>
  //   );
  // };

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
          <View
            key={index}
            style={{
              width: oneGridWidth,
              height: oneGridHeight, // これなんだろね。。。
              // aspectRatio: 1,
              // padding: 10, // これは単純に、25%幅に対して
              // marginBottom: 23,
              // backgroundColor: 'white',
              // backgroundColor: 'red',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
              style={{
                width: libraryContainerWidth,
                // height: 0,
                aspectRatio: 1,
                // height: '100%',
                // alignItems: 'center', // これと
                // justifyContent: 'center', // これで中のimageを上下左右真ん中にする

                // backgroundColor: rnDefaultBackgroundColor,
                // borderWidth: 0.3,
                marginBottom: 10,
              }}
              onPress={() => selectLibrary(library._id)}
              // onPress={() => {
              //   badgeDetailBottomSheetRef.current.snapToIndex(0);
              //   setPressedBadgeData(badgeData);
              //   console.log('hey');
              // }}
            >
              {/* <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: backgroundColorsTable[library.color],
                  borderWidth: 0.3,
                  borderColor: backgroundColorsTable[library.color],
                }}
              > */}
              <Image
                source={{ uri: library.thumbnail.data }}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
              />
              {/* <Ionicons name='ios-library' size={libraryIconWidth} color={iconColorsTable[library.color]} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name='fire' color={iconColorsTable[library.color]} size={20} />
                  <Text style={{ color: iconColorsTable[library.color], fontWeight: 'bold', fontSize: 15 }}>
                    {library.totalAssets}
                  </Text>
                </View> */}
              {/* </View> */}
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              style={{
                color: baseTextColor,
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                // borderWidth: 1,
                // borderRadius: 5,
                // padding: 4,
              }}
            >
              {library.name}
            </Text>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name='rocket-launch'
                style={{ marginRight: 5 }}
                size={20}
                color={iconColorsTable['red1']}
              />
              <Text style={{ color: baseTextColor }}>Yosuke Kojima</Text>
            </View> */}
          </View>
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
          <Text>Loading...</Text>
        </View>
      );
    }
  };

  return (
    <LibrariesContext.Provider
      value={{
        appMenuBottomSheetRef,
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
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {/* <Text style={{ color: 'red' }}>Your expo push token: {expoPushToken}</Text>
        <TouchableOpacity onPress={async () => experimentSendPushNotification()}>
          <Text style={{ color: 'yellow' }}>Press here</Text>
        </TouchableOpacity> */}
        <Text style={{ fontSize: 23, fontWeight: 'bold', padding: 10, color: 'white', marginBottom: 10 }}>
          Recently launched
        </Text>
        {renderLibraries()}
        <AppMenuBottomSheet />
        <CreateLibraryBottomSheet />
        <LibraryOverviewBottomSheet />
        <InfoDetailBottomSheet />
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
