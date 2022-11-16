import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

const BadgeFolder = (props) => {
  const renderImageThumbs = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image
          source={require('../../../../assets/freeAssets/anh-nguyen-kcA-c3f_3FE-unsplash.jpg')}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        <Image
          source={require('../../../../assets/freeAssets/bence-boros-8T5UAV6KkZA-unsplash.jpg')}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        <Image
          source={require('../../../../assets/freeAssets/danial-igdery-FCHlYvR5gJI-unsplash.jpg')}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        <Image
          source={require('../../../../assets/freeAssets/james-harrison-vpOeXr5wmR4-unsplash.jpg')}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        <Image
          source={require('../../../../assets/freeAssets/kelly-sikkema-sK0dKnDOcEM-unsplash.jpg')}
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
        />
        {/* <Image
          source={require('../../../../assets/freeAssets/markus-spiske-KWQ2kQtxiKE-unsplash.jpg')}
          // style={{ flex: 1 aspectRatio: 1,}}
        /> */}
      </View>
    );
  };
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 200,
        backgroundColor: backgroundColorsTable[props.badgeFolder.color],
        marginBottom: 30,
        borderRadius: 15,
        padding: 20,
      }}
      onPress={() => props.onSelectBadgeFolder(props.badgeFolder)}
    >
      <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
        <FastImage
          style={{ width: 55, height: 55, marginRight: 25 }}
          source={{
            uri: props.badgeFolder.icon,
            priority: FastImage.priority.normal,
          }}
          tintColor={iconColorsTable[props.badgeFolder.color]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{props.badgeFolder.name}</Text>
          <Text style={{ marginBottom: 5 }}>10k shared albums</Text>
          <Text style={{ marginBottom: 5 }}>100k assets</Text>
        </View>
      </View>
      <View style={{}}>{renderImageThumbs()}</View>
    </TouchableOpacity>
  );
};

export default BadgeFolder;
