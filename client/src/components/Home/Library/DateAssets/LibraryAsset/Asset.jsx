import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { iconsTable } from '../../../../../utils/icons';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../../../../utils/colorsTable';
const { MaterialCommunityIcons } = iconsTable;

const Asset = () => {
  const { libraryAsset, reactions } = useContext(LibraryAssetContext);

  const renderReactions = () => {
    if (reactions.length) {
      const list = reactions.map((reactionObject, index) => {
        return (
          <View key={index} style={{ marginRight: 15 }}>
            <FastImage
              source={{
                uri: reactionObject.user.photo
                  ? reactionObject.user.photo
                  : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              style={{ width: 50, height: 50, backgroundColor: iconColorsTable['blue1'], borderRadius: 5 }}
              tintColor={reactionObject.user.photo ? null : 'white'}
            />
            <View
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                right: -10,
                bottom: -10,
                backgroundColor: rnDefaultBackgroundColor,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: backgroundColorsTable[reactionObject.reaction.color],
                }}
              >
                <FastImage
                  source={{ uri: reactionObject.reaction.icon.url }}
                  style={{ width: 25, height: 25 }}
                  tintColor={iconColorsTable[reactionObject.reaction.color]}
                />
              </View>
            </View>
          </View>
        );
      });

      return (
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 10 }}>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>{list}</View>
          </ScrollView>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  switch (libraryAsset.asset.type) {
    case 'photo':
      return (
        <View style={{ width: '100%', marginBottom: 5 }}>
          <FastImage
            style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }}
            source={{ uri: libraryAsset.asset.data }}
          />
          {renderReactions()}
        </View>
      );
    case 'video':
      return (
        <View style={{ width: '100%', marginBottom: 5 }}>
          <Video
            style={{ width: '100%', height: 400, borderRadius: 8 }}
            source={{
              uri: libraryAsset.asset.data,
            }}
            useNativeControls={true}
            // resizeMode='stretch'
            resizeMode='cover'
            isLooping={false}
          />
          {renderReactions()}
        </View>
      );
    default:
      return null;
  }
};

export default Asset;
