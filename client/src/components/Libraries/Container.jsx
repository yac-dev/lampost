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
import { Ionicons } from '@expo/vector-icons';

import Library from './Library';
import AppMenuBottomSheet from './AppMenuBottomSheet';
import LibraryDetailBottomSheet from './LibraryDetailBottomSheet/Container';

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
  // const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);
  const [selectedLibraryDetailComponent, setSelectedLibraryDetailComponent] = useState('');
  const [isConfirmCancelCreatingLibraryModalOpen, setIsConfirmCancelCreatingLibraryModalOpen] = useState(false);

  const appMenuBottomSheetRef = useRef(null);
  const myLibrariesBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);
  const libraryDetailBottomSheetRef = useRef(null);
  const selectedLibraryDetailComponentBottomSheetRef = useRef(null);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 4 : Dimensions.get('window').height / 3.2;
  const libraryContainerWidth = oneGridWidth * 0.85;
  const libraryIconWidth = libraryContainerWidth * 0.4;

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

  // libraryを作った時
  useEffect(() => {
    if (props.route.params?.fromComponent === 'Create new library') {
      if (props.route.params.library.isPublic) {
        setLibraries((previous) => [...previous, props.route.params.library]);
      }
      // setMyJoinedLibraries((previous) => [...previous, props.route.params.library]);
      setSnackBar({
        isVisible: true,
        message: `Successfully created ${props.route.params.library.title}.`,
        barType: 'success',
        duration: 5000,
      });
      // setMyJoinedLibraries((previous) => {
      //   const updating = [...previous];
      //   const updated = updating.filter((library) => library._id !== props.route.params.leftLibraryId);
      //   return updated;
      // }) ここ、data structureどうなってたっけ？？
    }
  }, [props.route.params?.fromComponent]);

  const selectLibrary = async (libraryId) => {
    libraryDetailBottomSheetRef.current.snapToIndex(0);
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
        return <Library key={index} library={library} />;
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
            You'll see all the public libraries which were created.
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
        libraryDetailBottomSheetRef,
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
        // myJoinedLibraries,
        // setMyJoinedLibraries,
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
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              backgroundColor: iconColorsTable['blue1'],
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 5,
              // marginRight: 10,
            }}
            onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <Ionicons name='library' size={25} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Action</Text>
          </TouchableOpacity>
        ) : null}

        <AppMenuBottomSheet />
        <LibraryDetailBottomSheet />
        {/* <ConfirmCancelCreatingLibraryModal /> */}
      </View>
    </LibrariesContext.Provider>
  );
};

export default Container;
