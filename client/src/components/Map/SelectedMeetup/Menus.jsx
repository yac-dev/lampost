import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

import Menu from './Menu';

const Menus = (props) => {
  const renderDate = (date) => {
    if (date) {
      return (
        <Text>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</Text>
      );
    } else {
      return null;
    }
  };

  const menuOptions = [
    {
      name: 'Launcher',
      iconBackgroundColor: iconColorsTable['red1'],
      icon: <MaterialCommunityIcons name='rocket-launch' size={25} color={'white'} />,
      info: (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
          <Text>{`${props.selectedMeetup.launcher.name} >`}</Text>
        </View>
      ),
      onPress: () => {
        props.navigation.navigate('User', { userId: props.selectedMeetup.launcher._id });
      },
    },
    {
      name: 'Required Badges',
      iconBackgroundColor: iconColorsTable['lightGreen1'],
      icon: <Foundation name='sheriff-badge' size={25} color='white' />,
      info: (
        <Text>{`${props.selectedMeetup.launcher.name} >`}</Text>
        // <View style={{ flexDirection: 'row' }}>
        //   {props.selectedMeetup.badges.map((badge, index) => {
        //     return (
        //       <FastImage
        //         style={{ height: 35, width: 35 }}
        //         source={{
        //           uri: props.selectedMeetup.badge.icon,
        //           // headers: { Authorization: 'someAuthToken' },
        //           priority: FastImage.priority.normal,
        //         }}
        //         tintColor={iconColorsTable[props.selectedMeetup.badge.color]}
        //         resizeMode={FastImage.resizeMode.contain}
        //       />
        //     );
        //   })}
        // </View>
      ),
      onPress: () => {
        props.handleselectedMeetupDetailBottomSheetChanges('Badges');
      },
    },
    {
      name: 'Crew',
      iconBackgroundColor: iconColorsTable['violet1'],
      icon: <FontAwesome5 name='user-astronaut' size={25} color='white' />,
      info: <Text>{`${props.selectedMeetup.attendees.length} >`}</Text>,
      onPress: () => {
        props.handleselectedMeetupDetailBottomSheetChanges('Crew');
      },
    },
    {
      name: 'Q&As',
      iconBackgroundColor: iconColorsTable['pink1'],
      icon: <MaterialCommunityIcons name='chat-question' size={25} color='white' />,
      info: <Text>{`${props.selectedMeetup.comments.length} >`}</Text>,
      onPress: () => {
        props.handleselectedMeetupDetailBottomSheetChanges('QandAs');
      },
    },
    {
      name: 'Fee',
      // 254, 208, 0  // 236, 164, 20
      iconBackgroundColor: iconColorsTable['yellow1'],
      icon: <Foundation name='dollar-bill' size={25} color='white' />,
      info: <View>{props.selectedMeetup.isFeeFree ? <Text>Its free</Text> : <Text>Its not free</Text>}</View>,
      onPress: () => {
        props.handleselectedMeetupDetailBottomSheetChanges('Fee');
      },
    },
    {
      name: 'MediaPermission',
      iconBackgroundColor: iconColorsTable['lightBlue1'],
      icon: <FontAwesome5 name='photo-video' size={25} color='white' />,
      info: <View>{props.selectedMeetup.isMediaAllowed ? <Text>Allowed</Text> : <Text>Not allowed...</Text>}</View>,
      onPress: () => {
        // props.handleselectedMeetupDetailBottomSheetChanges('MediaPermission');
        props.handleselectedMeetupDetailBottomSheetChanges('MediaPermission');
      },
    },
    {
      name: 'Link',
      iconBackgroundColor: iconColorsTable['grey1'],
      icon: <Entypo name='link' size={25} color='white' />,
      info: <Text>right</Text>,
      onPress: () => {
        props.handleselectedMeetupDetailBottomSheetChanges('Links');
      },
    },
  ];

  const renderMenus = () => {
    const menusList = menuOptions.map((menu, index) => {
      return <Menu key={index} menu={menu} />;
    });

    return <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{menusList}</ScrollView>;
  };

  return <View contentContainerStyle={{ paddingBottom: 150 }}>{renderMenus()}</View>;
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Menus);
