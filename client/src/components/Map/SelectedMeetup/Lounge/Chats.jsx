import React, { useContext } from 'react';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';

const chatTypeTable = {
  general: iconColorsTable['grey1'],
  idea: iconColorsTable['yellow1'],
  questionOrHelp: iconColorsTable['blue1'],
  announcement: iconColorsTable['red1'],
};

const Chats = (props) => {
  const { chats } = useContext(LoungeContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US');
    return <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#ABABAB' }}>{d}</Text>;
  };

  const renderChatType = (type) => {
    switch (type) {
      case 'general':
        return <MaterialCommunityIcons name='comment-text' size={15} color={'white'} />;
      case 'idea':
        return <Ionicons name='bulb-outline' size={15} color={'white'} />;
      case 'questionOrHelp':
        return <FontAwesome5 name='question' size={15} color={'white'} />;
      case 'announcement':
        return <Entypo name='megaphone' size={15} color={'white'} />;
      case 'launched':
        return <Text>Launched</Text>;
      default:
        return null;
    }
  };

  const renderChats = () => {
    const chatsList = chats.map((chat, index) => {
      return (
        <TouchableOpacity key={index} style={{ padding: 10, borderBottomWidth: 0.3, borderBottomColor: '#ABABAB' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
            <View
              style={{
                backgroundColor: chatTypeTable[chat.type],
                padding: 5,
                borderRadius: 7,
                width: 25,
                height: 25,
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              {renderChatType(chat.type)}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#ABABAB' }}>{renderDate(chat.createdAt)}</Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 7 }}>{chat.content}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
            <View style={{ height: 25, width: 25, backgroundColor: 'blue', borderRadius: 5, marginRight: 5 }}></View>
            <Text>{chat.user.name}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return <View>{chatsList}</View>;
  };

  if (!chats.length) {
    return (
      <View>
        <Text style={{ color: baseTextColor }}>No comments yet.</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>{renderChats()}</ScrollView>
      </View>
    );
  }
};

export default Chats;
