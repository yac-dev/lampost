import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { bgColorsTable } from '../../../Utils/bgColorsTable';

const BadgeStatus = (props) => {
  const renderBadgeStatus = () => {
    const width = Dimensions.get('window').width / 5;
    return (
      <View
        style={{
          marginBottom: 35,
          width: width,
          height: width,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderRadius: 7,
            backgroundColor: bgColorsTable[props.badgeStatus.badge.color],
            borderStyle: 'solid',
            borderColor: bgColorsTable[props.badgeStatus.badge.color],
            borderWidth: 1,
            padding: 15,
            marginBottom: 3,
          }}
          onPress={() => {
            props.onBadgePress(props.badgeStatus._id);
          }}
        >
          <FastImage
            style={{ height: 50, width: props.badgeStatus.badge.landscape ? 70 : 50 }}
            source={{
              uri: props.badgeStatus.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={props.badgeStatus.badge.color}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 12, textAlign: 'center' }}>
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
