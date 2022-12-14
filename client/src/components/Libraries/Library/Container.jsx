import React, { useContext, useRef, useEffect, useState } from 'react';
import LibraryContext from './LibraryContext';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import SelectedAssetBottomSheet from './SelectedAssetBottomSheet';
import PostAssetsBottomSheet from './PostAssetsBottomSheet';
import PostsBottomSheet from './PostsBottomSheet';
import MembersBottomSheet from './MembersBottomSheet';
import Header from './Header';
import BadgeLabels from './BadgeLabels';
import Description from './Description';
import ConfirmLeaveLibrary from './ConfirmLeaveLibrary';
import ConfirmPostAssetModal from './ConfirmPostAssetModal';

const Container = (props) => {
  const appMenuBottomSheetRef = useRef(null);
  const selectedAssetBottomSheetRef = useRef(null);
  const membersBottomSheetRef = useRef(null);
  const reactionsBottomSheetRef = useRef(null);
  const postsBottomSheetRef = useRef(null);
  const postAssetsBottomSheetRef = useRef(null);
  const [isLeaveLibraryConfirmationModalOpen, setIsLeaveLibraryConfirmationModalOpen] = useState(false);
  const [isConfirmPostAssetsModalOpen, setIsConfirmPostAssetsModalOpen] = useState(false);
  const [library, setLibrary] = useState(null);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [libraryMembers, setLibraryMembers] = useState([]);
  const [libraryPosts, setLibraryPosts] = useState([]);
  const oneAssetWidth = Dimensions.get('window').width / 3;

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
  console.log(library);

  useEffect(() => {
    if (props.route.params?.addedAssets) {
      // console.log('this is the badges...', props.route.params.addedMeetupBadges);
      // props.dispatch({ type: 'SET_MEETUP_BADGES', payload: props.route.params.addedMeetupBadges });
      // まあ、単純に写真を表示するだけだから。。。
      console.log(props.route.params?.addedAssets);
      setAssets((previous) => [...previous, ...props.route.params?.addedAssets]);
      // ここであとはassetsをsetするだけと。
    }
  }, [props.route.params?.addedAssets]);

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
              setSelectedAsset(asset);
              selectedAssetBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{assetsList}</View>;
    } else {
      return <Text>Now loading...</Text>;
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        appMenuBottomSheetRef,
        selectedAssetBottomSheetRef,
        membersBottomSheetRef,
        postsBottomSheetRef,
        postAssetsBottomSheetRef,
        library,
        assets,
        setAssets,
        libraryMembers,
        setLibraryMembers,
        libraryPosts,
        setLibraryPosts,
        selectedAsset,
        setSelectedAsset,
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
        <AppMenuBottomSheet />
        <SelectedAssetBottomSheet />
        <PostAssetsBottomSheet />
        <PostsBottomSheet />
        <MembersBottomSheet />
        <ConfirmLeaveLibrary />
        <ConfirmPostAssetModal />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
