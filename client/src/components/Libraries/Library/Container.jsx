import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
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

  useEffect(() => {
    if (props.route.params?.addedAsset) {
      setAssets((previous) => [...previous, props.route.params?.addedAsset]);
    }
  }, [props.route.params?.addedAsset]);

  // const getLibrary = async () => {
  //   const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
  //   const { library } = result.data;
  //   setLibrary(library);
  //   setIsFetchedLibrary(true);
  // };
  // useEffect(() => {
  //   getLibrary();
  // }, []);

  const getAssetsByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryandassetrelationships/${props.route.params.libraryId}`);
    const { assets } = result.data;
    setAssets(assets);
    setIsFetchedAssets(true);
  };
  useEffect(() => {
    // if (library) {
    getAssetsByLibraryId();
    // }
  }, []);

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
        {/* {renderAssets()} */}
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
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
