import React, { useContext, useRef, useEffect, useState } from 'react';
import LibraryContext from './LibraryContext';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import FastImage from 'react-native-fast-image';

const Container = (props) => {
  const appMenuBottomSheetRef = useRef(null);
  const [library, setLibrary] = useState(null);
  const [assets, setAssets] = useState([]);
  const oneAssetWidth = Dimensions.get('window').width / 2;

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
            onPress={() => props.navigation.navigate('Asset', { asset })}
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
        library,
        assets,
        setAssets,
        navigation: props.navigation,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderAssets()}</ScrollView>
        <AppMenuBottomSheet />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
