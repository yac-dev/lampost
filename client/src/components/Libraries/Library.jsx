import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../GlobalContext';
import LibrariesContext from './LibrariesContext';
import lampostAPI from '../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
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
        <View style={{ position: 'absolute', top: 5, right: 20 }}>
          <Ionicons name='camer' size={20} color={'white'} />
        </View>
      );
    } else if (props.library.assetType === 'video') {
      return (
        <View style={{ position: 'absolute', top: 5, right: 20 }}>
          <Ionicons name='videocam' size={20} color={'white'} />
        </View>
      );
    } else if (props.library.assetType === 'photoAndVideo') {
      return (
        <View style={{ position: 'absolute', top: 5, right: 20, flexDirection: 'row', alignContent: 'center' }}>
          <Ionicons name='image' size={20} color={'white'} style={{ marginRight: 5 }} />
          <Ionicons name='videocam' size={20} color={'white'} />
        </View>
      );
    }
  };

  if (props.library.thumbnail.type === 'photo') {
    return (
      <View
        style={{
          width: oneGridWidth,
          height: oneGridHeight, // これなんだろね。。。
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          style={{
            width: libraryContainerWidth,
            aspectRatio: 1,
            marginBottom: 10,
          }}
          onPress={() => selectLibrary(props.library._id)}
        >
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: props.library.thumbnail.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
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
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {props.library.name}
        </Text>
        {renderAssetType()}
      </View>
    );
  } else if (props.library.thumbnail.type === 'video') {
    return (
      <View
        style={{
          width: oneGridWidth,
          height: oneGridHeight, // これなんだろね。。。
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          style={{
            width: libraryContainerWidth,
            aspectRatio: 1,
            marginBottom: 10,
          }}
          onPress={() => selectLibrary(props.library._id)}
        >
          <Video
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: props.library.thumbnail.data,
            }}
            useNativeControls={false}
            resizeMode='stretch'
            isLooping={false}
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
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {props.library.name}
        </Text>
        {renderAssetType()}
      </View>
    );
  }
};

export default Library;
