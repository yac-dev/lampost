import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Badge as RNPBadge, IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import { bgColorsTable } from '../bgColorsTable';

const Badge = (props) => {
  // Add badges(add user badgeとadd meetup badge)componentのbadgeをtapした時の挙動、
  const renderBadgeIcon = () => {
    if (props.fromComponent === 'Select meetup badge') {
      if (props.badgeState && props.badge._id === props.badgeState._id) {
        return (
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
        );
      } else {
        return null;
      }
    } else if (props.fromComponent === 'Add meetup badges') {
      if (props.meetupBadges[props.badge._id]) {
        return (
          <View
            style={{
              top: 5,
              right: 5,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <Foundation name='sheriff-badge' size={20} color='#49CF13' />
          </View>
        );
      } else {
        return null;
      }
    }
  };

  // const renderBadge = () => {
  //   return (
  //     <View
  //       style={{
  //         width: '20%',
  //         height: 0,
  //         aspectRatio: 1,
  //         padding: 10, // これは単純に、25%幅に対して
  //         marginBottom: 23,
  //         // backgroundColor: 'red',
  //       }}
  //     >
  //       <TouchableOpacity
  //         style={{
  //           width: '100%',
  //           height: '100%',
  //           alignItems: 'center', // これと
  //           justifyContent: 'center', // これで中のimageを上下左右真ん中にする
  //           borderRadius: 10,
  //           backgroundColor: backgroundColorsTable[props.badge.color],
  //           borderStyle: 'solid',
  //           borderColor: backgroundColorsTable[props.badge.color],
  //           borderWidth: 1,
  //           // backgroundColor: 'red',
  //           marginBottom: 5,
  //         }}
  //         onPress={() => {
  //           props.onBadgePress(props.badge);
  //         }}
  //       >
  //         <FastImage
  //           style={{ width: 50, height: 50 }}
  //           source={{
  //             uri: props.badge.icon,
  //             priority: FastImage.priority.normal,
  //           }}
  //           tintColor={iconColorsTable[props.badge.color]}
  //           resizeMode={FastImage.resizeMode.contain}
  //         />
  //       </TouchableOpacity>
  //       <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
  //         {props.badge.name}
  //       </Text>
  //       {renderBadgeIcon()}
  //     </View>
  //   );
  // };

  return (
    <View
      style={{
        width: '20%',
        height: 0,
        aspectRatio: 1,
        padding: 10, // これは単純に、25%幅に対して
        marginBottom: 23,
        // backgroundColor: 'red',
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          borderRadius: 10,
          backgroundColor: backgroundColorsTable[props.badge.color],
          borderStyle: 'solid',
          borderColor: backgroundColorsTable[props.badge.color],
          borderWidth: 1,
          // backgroundColor: 'red',
          marginBottom: 5,
        }}
        onPress={() => {
          props.onBadgePress(props.badge);
        }}
      >
        <FastImage
          style={{ width: 50, height: 50 }}
          source={{
            uri: props.badge.icon,
            priority: FastImage.priority.normal,
          }}
          tintColor={iconColorsTable[props.badge.color]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
        {props.badge.name}
      </Text>
      {renderBadgeIcon()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge, setIsTappedBadgeBottomSheetOpen })(Badge);
