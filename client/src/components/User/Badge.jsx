import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import lampostAPI from '../../apis/lampost';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
  baseTextColor,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';

import FastImage from 'react-native-fast-image';

const Badge = () => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { userBadge } = useContext(BadgeContext);
  const { setPressedBadgeData, badgeDetailBottomSheetRef } = useContext(UserContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;

  // const onBadgePress = async () => {
  //   const result = await lampostAPI.get(`/`); // badgeidとuser idでrelationshipを取ってきて、かつbadgeを持っているuserを一覧で出す感じ。
  //   // api側で、detailのobject dataを作る感じ。
  //   const { badgeDetail } = result.data;
  //   setTappedBadge(badge);
  // };

  const renderMojiTags = (badgeTags) => {
    const firstTwo = badgeTags.slice(0, 2);

    const list = firstTwo.map((badgeTag, index) => {
      return <Text key={index}>{badgeTag.emoji}</Text>;
    });

    return <>{list}</>;
  };

  return (
    <View
      // このviewは、textも含めての守備範囲のことな。
      style={{
        width: oneGridWidth,
        height: oneGridHeight, // これなんだろね。。。
        // aspectRatio: 1,
        // padding: 10, // これは単純に、25%幅に対して
        // marginBottom: 10,
        // backgroundColor: 'red',
        paddingTop: 15,
        // backgroundColor: 'red',
        alignItems: 'center',
        // backgroundColor: 'red',
        // marginBottom: 10,
        // paddingBottom: 10,
      }}
    >
      <TouchableOpacity
        // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
        style={{
          width: badgeContainerWidth,
          // height: 0,
          aspectRatio: 1,
          // height: '100%',
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          borderRadius: isIpad ? 22 : 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: 5,
        }}
        onPress={() => {
          badgeDetailBottomSheetRef.current.snapToIndex(0);
          setPressedBadgeData(userBadge);
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: isIpad ? 22 : 15,
            backgroundColor: backgroundColorsTable[userBadge.badge.color],
            borderWidth: 0.3,
            borderColor: backgroundColorsTable[userBadge.badge.color],
          }}
        >
          {userBadge.badge.icon ? (
            <FastImage
              style={{ height: badgeIconWidth, width: badgeIconWidth }}
              source={{
                uri: userBadge.badge.icon.url,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[userBadge.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : null}
          {userBadge.badgeTags.length ? (
            <View
              style={{
                backgroundColor: rnDefaultBackgroundColor,
                top: isIpad ? -7 : -13,
                right: isIpad ? -7 : -15,
                position: 'absolute',
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: backgroundColorsTable[userBadge.badge.color],
                  padding: 5,
                  borderRadius: 20,
                  flexDirection: 'row',
                }}
              >
                {renderMojiTags(userBadge.badgeTags)}
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      <Text
        numberOfLines={2}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          color: baseTextColor,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 12,
          textAlign: 'center',
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 4,
        }}
      >
        {userBadge.badge.name}
      </Text>
    </View>
  );
};

export default Badge;
