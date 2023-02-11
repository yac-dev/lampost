import React, { useContext, useRef, useEffect, useState } from 'react';
import LibraryContext from './LibraryContext';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { baseBackgroundColor, iconColorsTable, rnDefaultBackgroundColor } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import MembersBottomSheet from './MembersBottomSheet';
import Header from './Header';
import BadgeLabels from './BadgeLabels';
import Description from './Description';
import ConfirmLeaveLibrary from './ConfirmLeaveLibrary';
import ConfirmPostAssetModal from './ConfirmPostAssetModal';

const Container = (props) => {
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const { auth, setIsLoggedOutModalOpen } = useContext(GlobalContext);
  const appMenuBottomSheetRef = useRef(null);
  const selectedAssetBottomSheetRef = useRef(null);
  const membersBottomSheetRef = useRef(null);
  const reactionsBottomSheetRef = useRef(null);
  const [isLeaveLibraryConfirmationModalOpen, setIsLeaveLibraryConfirmationModalOpen] = useState(false);
  const [isConfirmPostAssetsModalOpen, setIsConfirmPostAssetsModalOpen] = useState(false);
  const [library, setLibrary] = useState(null);
  const [assets, setAssets] = useState([]);
  const [libraryMembers, setLibraryMembers] = useState([]);
  const [libraryPosts, setLibraryPosts] = useState([]);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  // ここで、libraryを取ってこないとね。
  const getLibrary = async () => {
    // console.log(props.route.params.libraryId);
    const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
    const { library } = result.data;
    setLibrary(library);
  };
  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    if (props.route.params?.addedAsset) {
      setAssets((previous) => [...previous, props.route.params?.addedAsset]);
    }
  }, [props.route.params?.addedAsset]);

  const getAssetsByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryandassetrelationships/${library._id}`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    if (library) {
      getAssetsByLibraryId();
    }
  }, [library]);

  const renderAssets = () => {
    if (assets.length) {
      // const assetsList = assets.map((asset, index) => {
      //   return (
      //     <TouchableOpacity
      //       key={index}
      //       style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
      //       onPress={() => props.navigation.navigate('Asset', { assetId: asset._id })}
      //     >
      //       <FastImage
      //         style={{ width: '100%', height: '100%' }}
      //         source={{
      //           uri: asset.data,
      //           priority: FastImage.priority.normal,
      //         }}
      //         resizeMode={FastImage.resizeMode.contain}
      //       />
      //     </TouchableOpacity>
      //   );
      // });
      // return (
      //   <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5, paddingTop: 5 }}>{assetsList}</View>
      // );

      const assetsList = assets.map((asset, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
            onPress={() => {
              // setSelectedAsset(asset);
              // selectedAssetBottomSheetRef.current.snapToIndex(0);
              props.navigation.navigate('Asset', {
                asset: asset,
                libraryId: library._id,
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
          </TouchableOpacity>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{assetsList}</View>;
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>Now loading...</Text>;
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        appMenuBottomSheetRef,
        selectedAssetBottomSheetRef,
        membersBottomSheetRef,
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
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Header />
          <BadgeLabels />
          <Description />
          {renderAssets()}
        </ScrollView>
        {auth.isAuthenticated ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <View
              style={{
                backgroundColor: iconColorsTable['grey1'],
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons name='plus' size={25} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Menu</Text>
              <MaterialCommunityIcons name='chevron-down' size={25} color={'white'} />
            </View>
          </TouchableOpacity>
        ) : null}

        <AppMenuBottomSheet />
        <MembersBottomSheet />
        <ConfirmLeaveLibrary />
        <ConfirmPostAssetModal />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
