import React from 'react';
import { View, Text } from 'react-native';
import { iconColorsTable } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const chatIconTable = {
  general: {
    icon: <MaterialCommunityIcons name='comment-text' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['blue1'],
  },
  reply: {
    icon: <MaterialCommunityIcons name='reply' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['green1'],
  },
  question: {
    icon: <AntDesign name='questioncircle' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['yellow1'],
  },
  help: {
    icon: <AntDesign name='exclamationcircle' size={20} color={'white'} />,
    backgroundColor: iconColorsTable['red1'],
  },
};

const ChatStatus = (props) => {
  const render = () => {
    if (props.status) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
          <View
            style={{
              backgroundColor: chatIconTable[props.chatType].backgroundColor,
              marginRight: 5,
              borderRadius: 5,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {chatIconTable[props.chatType].icon}
          </View>
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
