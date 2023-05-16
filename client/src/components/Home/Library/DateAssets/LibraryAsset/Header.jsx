import React, { useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';

const Header = () => {
  const { auth } = useContext(GlobalContext);
  const { libraryAsset, navigation } = useContext(LibraryAssetContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    const dateElements = d.split('/');

    return (
      <Text
        style={{
          fontSize: 16,
          color: baseTextColor,
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

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
              style={{ width: 30, height: 30, borderRadius: 8, marginRight: 5 }}
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
        <TouchableOpacity
          style={{ width: 60, height: 70, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
          onPress={() => {
            if (auth.data._id !== libraryAsset.asset.createdBy._id) {
              navigation.navigate('Home library member', { userId: libraryAsset.asset.createdBy._id });
            } else {
              return null;
            }
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: iconColorsTable['blue1'],
              }}
              source={{
                uri: libraryAsset.asset.createdBy.photo
                  ? libraryAsset.asset.createdBy.photo
                  : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              tintColor={libraryAsset.asset.createdBy.photo ? null : 'white'}
            />
            <Text style={{ position: 'absolute', bottom: -5, right: -5, fontSize: 18 }}>{libraryAsset.asset.mood}</Text>
          </View>
          <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>
            {libraryAsset.asset.createdBy.name}
          </Text>
        </TouchableOpacity>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{libraryAsset.asset.meetup.title}</Text>
            <Text style={{ color: baseTextColor, fontSize: 15 }}>{renderDate(libraryAsset.asset.createdAt)}</Text>
          </View>
          {renderTaggedPeople()}
        </View>
      </View>
    </View>
  );
};

export default Header;
