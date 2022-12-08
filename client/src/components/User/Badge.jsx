import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import lampostAPI from '../../apis/lampost';
import { SimpleLineIcons } from '@expo/vector-icons';
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
  const oneGridWidth = Dimensions.get('window').width / 4;
  const oneGridHeight = Dimensions.get('window').height / 8;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;

  // const onBadgePress = async () => {
  //   const result = await lampostAPI.get(`/`); // badgeidとuser idでrelationshipを取ってきて、かつbadgeを持っているuserを一覧で出す感じ。
  //   // api側で、detailのobject dataを作る感じ。
  //   const { badgeDetail } = result.data;
  //   setTappedBadge(badge);
  // };

  return (
    <View
      style={{
        width: oneGridWidth,
        height: oneGridHeight, // これなんだろね。。。
        // aspectRatio: 1,
        // padding: 10, // これは単純に、25%幅に対して
        // marginBottom: 23,
        // backgroundColor: 'white',
        // backgroundColor: 'red',
        alignItems: 'center',
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
          borderRadius: 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: 10,
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
            borderRadius: 15,
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
        </View>
      </TouchableOpacity>
      <Text
        style={{
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
        {badgeData.badge.name}
      </Text>
      {badgeData.url ? (
        <View
          style={{
            top: 0,
            right: 10,
            position: 'absolute',
          }}
        >
          <SimpleLineIcons name='paper-clip' size={20} color='white' />
        </View>
      ) : null}
    </View>
  );
};

export default Badge;
