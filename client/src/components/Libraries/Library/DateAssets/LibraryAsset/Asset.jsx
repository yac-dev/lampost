import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';

const Asset = () => {
  const { libraryAsset } = useContext(LibraryAssetContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const dateElements = d.split('/');

    return (
      <Text
        style={{
          fontSize: 17,
          color: 'orange',
          // color: 'white',
          fontStyle: 'italic',
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  switch (libraryAsset.asset.type) {
    case 'photo':
      return (
        <View style={{ width: '100%', marginBottom: 5 }}>
          <FastImage
            style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }}
            source={{ uri: libraryAsset.asset.data }}
          />
          <Text style={{ color: 'orange', position: 'absolute', right: 10, bottom: 10 }}>
            {renderDate(libraryAsset.createdAt)}
          </Text>
        </View>
      );
    case 'video':
      return (
        <View style={{ width: '100%', marginBottom: 5 }}>
          <Video
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: libraryAsset.asset.data,
            }}
            useNativeControls={true}
            resizeMode='stretch'
            isLooping={false}
          />
          {/* <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[asset.effect]]} />
          </View> */}
        </View>
      );
    default:
      return null;
  }
};

export default Asset;
