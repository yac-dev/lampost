import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import CreateBadgesIndexContext from './createBadgesIndexContext';
import FastImage from 'react-native-fast-image';
import {
  inputBackgroundColorNew,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const AddedBadges = () => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { indexTitleTextInput, addedBadges, setAddedBadges, setIndieBadges } = useContext(CreateBadgesIndexContext);
  const { MaterialCommunityIcons } = iconsTable;
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;

  const renderAddedBadges = () => {
    const badgeDatasList = Object.values(addedBadges);
    if (badgeDatasList.length) {
      const badgesList = badgeDatasList.map((userBadge, index) => {
        return (
          <View key={index}>
            <View
              style={{
                width: oneGridWidth,
                height: oneGridHeight,
                paddingTop: 10,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: badgeContainerWidth,
                  aspectRatio: 1,
                  // height: '100%',
                  alignItems: 'center', // これと
                  justifyContent: 'center', // これで中のimageを上下左右真ん中にする
                  borderRadius: 15,
                  backgroundColor: rnDefaultBackgroundColor,
                  borderWidth: 0.3,
                  marginBottom: 5,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: backgroundColorsTable[userBadge.badge.color],
                    borderWidth: 0.3,
                    borderColor: backgroundColorsTable[userBadge.badge.color],
                  }}
                >
                  <FastImage
                    style={{ height: badgeIconWidth, width: badgeIconWidth }}
                    source={{
                      uri: userBadge.badge.icon.url,
                      priority: FastImage.priority.normal,
                    }}
                    tintColor={iconColorsTable[userBadge.badge.color]}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  color: baseTextColor,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {userBadge.badge.name}
              </Text>
            </View>
            {indexTitleTextInput ? (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 5,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: iconColorsTable['red1'],
                }}
                onPress={() => {
                  setAddedBadges((previous) => {
                    const updating = { ...previous };
                    delete updating[userBadge._id];
                    return updating;
                  });
                  setIndieBadges((previous) => {
                    return {
                      ...previous,
                      [userBadge._id]: userBadge,
                    };
                  });
                }}
              >
                <MaterialCommunityIcons name='minus' color='white' size={20} />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      });
      return (
        <ScrollView horizontal={true}>
          <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
            {badgesList}
          </View>
        </ScrollView>
      );
    } else {
      return <Text>This user hasn't register any badges yet...</Text>;
    }
  };

  if (indexTitleTextInput) {
    return (
      <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 40 }}>
        <View style={{ backgroundColor: inputBackgroundColorNew, borderRadius: 5 }}>
          {Object.keys(addedBadges).length ? (
            <View>{renderAddedBadges()}</View>
          ) : // <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          //   <MaterialCommunityIcons name='plus' color={'white'} size={20} />
          //   <Text style={{ color: 'white' }}>Please add badges you wanna put inside this index.</Text>
          // </View>
          null}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default AddedBadges;
