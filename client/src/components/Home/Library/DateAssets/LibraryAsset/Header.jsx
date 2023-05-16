import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';

const Header = () => {
  const { libraryAsset, navigation } = useContext(LibraryAssetContext);
  const renderTaggedPeople = () => {
    if (libraryAsset.asset.taggedPeople.length) {
      const usersList = libraryAsset.asset.taggedPeople.map((user, index) => {
        if (user) {
          return (
            <FastImage
              key={index}
              source={{
                uri: user.photo ? user.photo : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              style={{ width: 25, height: 25, borderRadius: 5, marginRight: 5 }}
            />
          );
        } else {
          return null;
        }
      });

      return (
        <ScrollView horizontal={true}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home library tagged people', {
                taggedPeople: libraryAsset.asset.taggedPeople.map((user) => user._id),
              })
            }
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            {usersList}
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 20 }}>
          <FastImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
            }}
            source={{
              uri: libraryAsset.asset.createdBy.photo
                ? libraryAsset.asset.createdBy.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
            }}
            tintColor={libraryAsset.asset.createdBy.photo ? null : 'white'}
          />
          <Text style={{ position: 'absolute', bottom: -5, right: -10, fontSize: 18 }}>{libraryAsset.asset.mood}</Text>
        </View>
        <View>
          <Text style={{ color: 'white', marginBottom: 5, fontSize: 20, fontWeight: 'bold' }}>
            {libraryAsset.asset.createdBy.name}
          </Text>
          {renderTaggedPeople()}
        </View>
      </View>
    </View>
  );
};

export default Header;
