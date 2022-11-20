import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';

const BadgeStatus = (props) => {
  const renderBadgeStatus = () => {
    const width = Dimensions.get('window').width / 5;
    return (
      <View
        style={{
          width: '20%',
          height: 0, // これなんだろね。。。
          aspectRatio: 1,
          padding: 10, // これは単純に、25%幅に対して
          marginBottom: 23,
          // backgroundColor: 'white',
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 7,
            backgroundColor: backgroundColorsTable[props.badgeStatus.badge.color],
            borderStyle: 'solid',
            borderColor: backgroundColorsTable[props.badgeStatus.badge.color],
            borderWidth: 1,
            marginBottom: 5,
          }}
          onPress={() => {
            props.onBadgePress(props.badgeStatus._id);
          }}
        >
          <FastImage
            style={{ height: 50, width: 50 }}
            source={{
              uri: props.badgeStatus.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.badgeStatus.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 12,
            textAlign: 'center',
            // borderWidth: 1,
            // borderRadius: 5,
            // padding: 4,
          }}
        >
          {props.badgeStatus.badge.name}
        </Text>
        {props.badgeStatus.url ? (
          <View
            style={{
              top: 0,
              right: 0,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <SimpleLineIcons name='paper-clip' size={20} color='#9C9C9C' />
          </View>
        ) : null}
      </View>
    );
  };

  return <>{renderBadgeStatus()}</>;
};

export default BadgeStatus;
