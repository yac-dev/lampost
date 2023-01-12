import React, { useContext, useRef } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { iconColorsTable, baseTextColor, appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const chatTypeTable = {
  general: iconColorsTable['blue1'],
  idea: iconColorsTable['yellow1'],
  questionOrHelp: iconColorsTable['blue1'],
  announcement: iconColorsTable['red1'],
};

const Chats = (props) => {
  const scrollViewRef = useRef();
  const { chats, meetup } = useContext(LoungeContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(118, 120, 124)' }}>{d}</Text>;
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
    // const chats = myUpcomingMeetupAndChatsTable[meetup._id];
    if (chats.length) {
      const chatsList = chats.map((chat, index) => {
        // launcherのchatだけは、背景を少し変える。
        return (
          <View key={index} style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              {chat.user.photo ? (
                <View style={{ width: 40, height: 40, borderRadius: 10, marginRight: 20 }}>
                  <Image
                    source={{ uri: chat.user.photo }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  />
                  <View
                    style={{
                      backgroundColor: chatTypeTable[chat.type],
                      padding: 2,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: -10,
                      right: -10,
                    }}
                  >
                    {renderChatType(chat.type)}
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginRight: 20,
                    backgroundColor: iconColorsTable['blue1'],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesome5 name='user-astronaut' size={20} color='white' />
                  <View
                    style={{
                      backgroundColor: chatTypeTable[chat.type],
                      padding: 2,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      bottom: -10,
                      right: -10,
                    }}
                  >
                    {renderChatType(chat.type)}
                  </View>
                </View>
              )}
              <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, flexShrink: 1 }}>
                  <Text style={{ color: baseTextColor, marginRight: 10, fontSize: 15, fontWeight: 'bold' }}>
                    {chat.user.name}
                  </Text>
                  {renderDate(chat.createdAt)}
                </View>
                <Text style={{ fontSize: 15, marginBottom: 10, color: baseTextColor }}>{chat.content}</Text>
              </View>
            </View>
          </View>
        );
      });

      return <View style={{ padding: 10 }}>{chatsList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor, textAlign: 'center', marginTop: 50 }}>
            You'll see all the chats of this meetup group.
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderChats()}
      </ScrollView>
    </View>
  );
};

export default Chats;
