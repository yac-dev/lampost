import React from 'react';
import { View, Text } from 'react-native';
import { iconColorsTable } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const chatIconTable = {
  general: {
    icon: <MaterialCommunityIcons name='comment-text' size={15} color={'white'} style={{ marginRight: 3 }} />,
    backgroundColor: iconColorsTable['blue1'],
  },
  reply: {
    icon: <MaterialCommunityIcons name='reply' size={15} color={'white'} style={{ marginRight: 3 }} />,
    backgroundColor: iconColorsTable['green1'],
  },
  question: {
    icon: <AntDesign name='questioncircle' size={15} color={'white'} style={{ marginRight: 3 }} />,
    backgroundColor: iconColorsTable['yellow1'],
  },
  help: {
    icon: <AntDesign name='exclamationcircle' size={15} color={'white'} style={{ marginRight: 3 }} />,
    backgroundColor: iconColorsTable['red1'],
  },
  edited: {
    icon: <Entypo name='megaphone' size={15} color={'white'} style={{ marginRight: 3 }} />,
    backgroundColor: iconColorsTable['red1'],
  },
};

const ChatStatus = (props) => {
  const render = () => {
    if (props.status) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: chatIconTable[props.chatType].backgroundColor,
            padding: 3,
            borderRadius: 3,
          }}
        >
          {chatIconTable[props.chatType].icon}
          <Text style={{ fontSize: 13, color: 'white', textAlign: 'center' }}>{props.status}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return <>{render()}</>;
};

export default ChatStatus;
{
  /* <MaterialCommunityIcons
        name='comment-text'
        size={17}
        color={'white'}
      /> */
}
