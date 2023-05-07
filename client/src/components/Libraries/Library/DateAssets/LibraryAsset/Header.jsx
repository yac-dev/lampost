import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';

const Header = () => {
  const { libraryAsset } = useContext(LibraryAssetContext);
  console.log(libraryAsset);
  return (
    <View style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
      <FastImage
        style={{ width: 40, height: 40, borderRadius: 5, marginRight: 10, backgroundColor: iconColorsTable['blue1'] }}
        source={{
          uri: libraryAsset.asset.createdBy.photo
            ? libraryAsset.asset.createdBy.photo
            : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
        }}
        tintColor={libraryAsset.asset.createdBy.photo ? null : 'white'}
      />
      <View>
        <Text style={{ color: 'white', marginBottom: 5, fontSize: 17, fontWeight: 'bold' }}>
          {libraryAsset.asset.createdBy.name}
        </Text>
        <Text style={{ color: baseTextColor, fontSize: 16 }}>{libraryAsset.asset.meetup.title}</Text>
      </View>
    </View>
  );
};

export default Header;
