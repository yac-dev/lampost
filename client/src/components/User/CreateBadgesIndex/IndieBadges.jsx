import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import CreateBadgesIndexContext from './createBadgesIndexContext';
import FastImage from 'react-native-fast-image';
import {
  backgroundColorsTable,
  iconColorsTable,
  rnDefaultBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const Badges = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { isIpad } = useContext(GlobalContext);
  const { indieBadges, setIndieBadges, indexTitleTextInput, setAddedBadges } = useContext(CreateBadgesIndexContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;

  const renderBadges = () => {
    const badgeDatasList = Object.values(indieBadges);
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
                  backgroundColor: iconColorsTable['lightGreen1'],
                }}
                onPress={() => {
                  setAddedBadges((previous) => {
                    return {
                      ...previous,
                      [userBadge._id]: userBadge,
                    };
                  });
                  setIndieBadges((previous) => {
                    const updating = { ...previous };
                    delete updating[userBadge._id];
                    return updating;
                  });
                }}
              >
                <MaterialCommunityIcons name='plus' color='white' size={20} />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      });
      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>{badgesList}</View>
        </ScrollView>
      );
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>No badges left.</Text>;
    }
  };
  return <View>{renderBadges()}</View>;
};

export default Badges;
