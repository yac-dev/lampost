import React from 'react';
import { View, Text } from 'react-native';

const Badge = (props) => {
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
          borderRadius: 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: 5,
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
          {badgeData.badgeTags.length ? (
            <View
              style={{
                backgroundColor: rnDefaultBackgroundColor,
                width: isIpad ? 25 : 16,
                height: isIpad ? 25 : 16,
                top: isIpad ? -7 : -7,
                right: isIpad ? -7 : -7,
                position: 'absolute',
                borderRadius: isIpad ? 12.5 : 8,
              }}
            >
              <View
                style={{
                  backgroundColor: iconColorsTable['green1'],
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: isIpad ? 12.5 : 10,
                }}
              >
                <Ionicons name='pricetags' size={10} color={'white'} />
              </View>
            </View>
          ) : null}
          {badgeData.links.length ? (
            <View
              style={{
                backgroundColor: rnDefaultBackgroundColor,
                width: isIpad ? 25 : 16,
                height: isIpad ? 25 : 16,
                top: isIpad ? -7 : 8,
                right: isIpad ? -7 : -7,
                position: 'absolute',
                borderRadius: isIpad ? 12.5 : 8,
              }}
            >
              <View
                style={{
                  backgroundColor: iconColorsTable['grey1'],
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: isIpad ? 12.5 : 10,
                }}
              >
                <MaterialCommunityIcons name='link-variant' size={10} color={'white'} />
              </View>
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
          fontSize: 12,
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
