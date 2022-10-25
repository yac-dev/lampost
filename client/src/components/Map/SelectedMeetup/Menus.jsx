import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
      iconBackgroundColor: 'rgba(255, 51, 51, 0.85)',
      icon: <MaterialCommunityIcons name='rocket-launch' size={25} color='white' />,
      info: (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
          <Text>{`${props.selectedMeetup.launcher.name} >`}</Text>
        </View>
      ),
    },
    {
      name: 'Badges',
      iconBackgroundColor: 'rgba(45, 209, 40, 0.85)',
      icon: <Foundation name='sheriff-badge' size={25} color='white' />,
      info: <Text>Hello</Text>,
    },
    // {
    //   name: 'Date & Time',
    //   iconBackgroundColor: 'rgba(39, 80, 204, 0.85)',
    //   icon: <MaterialCommunityIcons name='calendar-clock' size={25} color='white' />,
    //   info: <Text>{props.selectedMeetup.title}</Text>,
    // },
    {
      name: 'Fee',
      iconBackgroundColor: 'rgba(236, 164, 20, 0.85)',
      icon: <Foundation name='dollar-bill' size={25} color='white' />,
      info: <View>{props.selectedMeetup.isFeeFree ? <Text>Its free</Text> : <Text>Its not free</Text>}</View>,
    },
    {
      name: 'Q&As',
      iconBackgroundColor: 'grey',
      icon: <MaterialCommunityIcons name='chat-question' size={25} color='white' />,
      info: <Text>{`${props.selectedMeetup.comments.length} >`}</Text>,
    },
    {
      name: 'Crew',
      iconBackgroundColor: 'purple',
      icon: <FontAwesome5 name='user-astronaut' size={25} color='white' />,
      info: <Text>Hello</Text>,
    },
    // {
    //   name: 'Description',
    //   iconBackgroundColor: 'rgba(174, 101, 9, 0.85)',
    //   icon: <MaterialCommunityIcons name='message-text' size={25} color='white' />,
    //   info: <Text>Hello</Text>,
    // },
    {
      name: 'MediaPermission',
      iconBackgroundColor: 'rgba(19, 167, 236, 0.85)',
      icon: <FontAwesome5 name='photo-video' size={25} color='white' />,
      info: <Text>Hello</Text>,
    },
    {
      name: 'Link',
      iconBackgroundColor: 'rgba(163, 163, 163, 0.85)',
      icon: <Entypo name='link' size={25} color='white' />,
      info: <Text>Hello</Text>,
    },
  ];

  const renderMenus = () => {
    const menusList = menuOptions.map((menu, index) => {
      return <Menu key={index} menu={menu} />;
    });

    return <View>{menusList}</View>;
  };

  return <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>{renderMenus()}</ScrollView>;
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Menus);
