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

import FastImage from 'react-native-fast-image';

const Badge = () => {
  const { badgeData } = useContext(BadgeContext);
  const { setPressedBadgeData, badgeDetailBottomSheetRef } = useContext(UserContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 5 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;

  // const onBadgePress = async () => {
  //   const result = await lampostAPI.get(`/`); // badgeidとuser idでrelationshipを取ってきて、かつbadgeを持っているuserを一覧で出す感じ。
  //   // api側で、detailのobject dataを作る感じ。
  //   const { badgeDetail } = result.data;
  //   setTappedBadge(badge);
  // };

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
        paddingTop: 10,
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
          borderRadius: isIpad ? 25 : 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: isIpad ? 10 : 5,
        }}
        onPress={() => {
          badgeDetailBottomSheetRef.current.snapToIndex(0);
          setPressedBadgeData(badgeData);
          console.log('hey');
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: isIpad ? 25 : 15,
            backgroundColor: backgroundColorsTable[badgeData.badge.color],
            borderWidth: 0.3,
            borderColor: backgroundColorsTable[badgeData.badge.color],
          }}
        >
          <FastImage
            style={{ height: badgeIconWidth, width: badgeIconWidth }}
            source={{
              uri: badgeData.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[badgeData.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
          {badgeData.badgeTags.length ? (
            <View
              style={{
                backgroundColor: rnDefaultBackgroundColor,
                width: isIpad ? 35 : 20,
                height: isIpad ? 35 : 20,
                top: isIpad ? -10 : -5,
                right: isIpad ? -10 : -5,
                position: 'absolute',
                borderRadius: isIpad ? 25 : 10,
              }}
            >
              <View
                style={{
                  backgroundColor: iconColorsTable[badgeData.badge.color],
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: isIpad ? 25 : 10,
                }}
              >
                <Text style={{ color: 'white', fontSize: isIpad ? 23 : 15 }}>{badgeData.badgeTags.length}</Text>
              </View>
            </View>
          ) : null}
          {badgeData.link ? (
            <View
              style={{
                top: -7,
                left: -7,
                position: 'absolute',
                transform: [{ rotateY: '180deg' }],
              }}
            >
              <Entypo name='link' size={20} color={'rgb(174, 180, 193)'} />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          color: baseTextColor,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: isIpad ? 17 : 12,
          textAlign: 'center',
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 4,
        }}
      >
        {badgeData.badge.name}
      </Text>
    </View>
  );
};

export default Badge;
