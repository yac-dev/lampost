import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Badge as RNPBadge, IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import { bgColorsTable } from '../bgColorsTable';

const Badge = (props) => {
  // Add badges(add user badgeとadd meetup badge)componentのbadgeをtapした時の挙動、
  // user page componentのbadgeをtapした時の挙動を変えるっていう話。
  const onBadgePress = () => {
    if (11) {
      // badgeStatus関係ないときには
      props.onBadgePress(props.badge);
    } else {
      // badgeStatusがある時はこれを実行する。
      props.onBadgePress(props.badgeStatus);
    }
  };

  const renderBadge = () => {
    return (
      <View
        style={{
          marginBottom: 20,
          width: '25%',
          height: 0,
          aspectRatio: 1,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: bgColorsTable[props.badge.color],
            borderStyle: 'solid',
            borderColor: bgColorsTable[props.badge.color],
            borderWidth: 1,
            width: '100%',
            height: '100%',
            // backgroundColor: 'red',
            // padding: 15,
            marginBottom: 3,
          }}
          onPress={() => {
            props.onBadgePress(props.badge);
          }}
        >
          <FastImage
            style={{ height: 50, width: props.badge.landscape ? 70 : 50 }}
            source={{
              uri: props.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={props.badge.color}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
          {props.badge.name}
        </Text>
        {props.selectedBadges[props.badge._id] ? (
          <View
            style={{
              top: 0,
              right: 0,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <Foundation name='sheriff-badge' size={20} color='#49CF13' />
          </View>
        ) : null}
      </View>
    );
  };

  return <>{renderBadge()}</>;
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge, setIsTappedBadgeBottomSheetOpen })(Badge);
