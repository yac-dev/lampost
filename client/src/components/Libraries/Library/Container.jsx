import React, { useContext, useRef, useEffect, useState } from 'react';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import FastImage from 'react-native-fast-image';

const Container = (props) => {
  const appMenuBottomSheetRef = useRef(null);
  const [library, setLibrary] = useState(null);
  const [selectedRoll, setSelectedRoll] = useState(null); // defaultでlibraryの一番目のrollとする。
  const [assets, setAssets] = useState([]);

  const getLibrary = async () => {
    // console.log(props.route.params.libraryId);
    const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
    const { library } = result.data;
    setLibrary(library);
    setSelectedRoll(library.rolls[0]._id);
  };
  useEffect(() => {
    getLibrary();
  }, []);

  const getAssets = async () => {
    const result = await lampostAPI.get(`/rollAndAssetRelationships/${selectedRoll}`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    if (selectedRoll) {
      getAssets();
    }
  }, [selectedRoll]);

  const renderAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        return (
          // このheight undefinedが効く。なぜか分からんが。
          <TouchableOpacity
            key={index}
            style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
            onPress={() => props.navigation.navigate('Asset', { assetId: asset._id })}
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
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5, paddingTop: 5 }}>{assetsList}</View>
      );
    } else {
      return <Text>Now loading...</Text>;
    }
  };

  return (
    <LibraryContext.Provider
      value={{ appMenuBottomSheetRef, library, selectedRoll, setSelectedRoll, assets, setAssets }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <ScrollView>{renderAssets()}</ScrollView>
        <AppMenuBottomSheet />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
