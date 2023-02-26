import React from 'react';
import { View, Text } from 'react-native';
import { iconColorsTable } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const chatIconTable = {
  general: {
    icon: <MaterialCommunityIcons name='comment-text' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['blue1'],
    marginBottom: 10,
    marginRight: 10,
  },
  reply: {
    icon: <MaterialCommunityIcons name='reply' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['green1'],
    marginBottom: 10,
    marginRight: 0,
  },
  question: {
    icon: <AntDesign name='questioncircle' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['yellow1'],
    marginBottom: 0,
    marginRight: 10,
  },
  help: {
    icon: <AntDesign name='exclamationcircle' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['red1'],
    marginBottom: 0,
    marginRight: 0,
  },
};

const ChatStatus = (props) => {
  return (
    <View
      style={{
        backgroundColor: chatIconTable[props.chatType].backgroundColor,
        marginRight: chatIconTable[props.chatType].marginRight,
        marginBottom: chatIconTable[props.chatType].marginBottom,
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {chatIconTable[props.chatType].icon}
      {props.status ? (
        <View
          style={{
            position: 'absolute',
            top: -7,
            right: -7,
            width: 16,
            height: 16,
            borderRadius: 8,
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: chatIconTable[props.chatType].backgroundColor,
          }}
        >
          <Text style={{ fontSize: 12, color: 'white', textAlign: 'center' }}>{props.status}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ChatStatus;
{
  /* <MaterialCommunityIcons
        name='comment-text'
        size={17}
        color={'white'}
      /> */
}
