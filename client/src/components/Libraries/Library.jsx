import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../GlobalContext';
import LibrariesContext from './LibrariesContext';
import lampostAPI from '../../apis/lampost';
import FastImage from 'react-native-fast-image';
import SVG from 'react-native-svg';
import { baseTextColor } from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';

const Library = (props) => {
  const { Ionicons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const { libraryOverviewBottomSheetRef, setSelectedLibrary, setLibraryAssets } = useContext(LibrariesContext);
  const [loaded, setLoaded] = useState(false);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 4 : Dimensions.get('window').height / 3.2;
  const libraryContainerWidth = oneGridWidth * 0.85;

  const selectLibrary = async (libraryId) => {
    libraryOverviewBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/libraries/${libraryId}`);
    const { library } = result.data;
    setSelectedLibrary(library);
    const res = await lampostAPI.get(`/libraryandassetrelationships/${libraryId}`);
    const { assets } = res.data;
    setLibraryAssets(assets);
  };

  const renderAssetType = () => {
    if (props.library.assetType === 'photo') {
      return (
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Ionicons name='camer' size={25} color={'white'} />
        </View>
      );
    } else if (props.library.assetType === 'video') {
      return (
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Ionicons name='videocam' size={25} color={'white'} />
        </View>
      );
    } else if (props.library.assetType === 'photoAndVideo') {
      return (
        <View style={{ position: 'absolute', top: 5, right: 20, flexDirection: 'row', alignContent: 'center' }}>
          <Ionicons name='camera' size={20} color={'white'} style={{ marginRight: 5 }} />
          <Ionicons name='videocam' size={20} color={'white'} />
        </View>
      );
    }
  };

  return (
    <View
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
        onPress={() => selectLibrary(props.library._id)}
      >
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={{
            uri: props.library.thumbnail.data,
            // priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoad={() => {
            setLoaded(false);
          }}
        />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          color: baseTextColor,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 15,
          textAlign: 'center',
          // marginBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 4,
        }}
      >
        {props.library.name}
      </Text>
      {renderAssetType()}
    </View>
  );
};

export default Library;
