import React, { useContext, useRef } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import {
  iconColorsTable,
  baseTextColor,
  appBottomSheetBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';

const chatTypeTable = {
  general: iconColorsTable['blue1'],
  help: iconColorsTable['red1'],
  question: iconColorsTable['yellow1'],
  reply: iconColorsTable['green1'],
  edited: iconColorsTable['red1'],
};

const Chats = (props) => {
  const scrollViewRef = useRef();
  const { isIpad } = useContext(GlobalContext);
  const { chats, meetup, sendChatBottomSheetRef, textInputRef, replyingTo, setReplyingTo, navigation } =
    useContext(LoungeContext);

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
      case 'reply':
        return <MaterialCommunityIcons name='reply' size={15} color={'white'} />;
      case 'help':
        return <AntDesign name='exclamationcircle' size={15} color={'white'} />;
      case 'question':
        return <AntDesign name='questioncircle' size={15} color={'white'} />;
      case 'edited':
        return <Entypo name='megaphone' size={15} color={'white'} />;
      default:
        return null;
    }
  };

  const renderUserAvatar = (chat) => {
    if (chat.user) {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            marginRight: 20,
            backgroundColor: iconColorsTable['blue1'],
          }}
        >
          <FastImage
            source={{
              uri: chat.user.photo
                ? chat.user.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
            }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            tintColor={chat.user.photo ? null : 'white'}
          />
          <View
            style={{
              backgroundColor: chatTypeTable[chat.type],
              padding: 2,
              borderRadius: 5,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: -7,
              right: -7,
            }}
          >
            {renderChatType(chat.type)}
          </View>
        </View>
      );
    } else {
      return (
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
          <MaterialCommunityIcons name='ghost' size={20} color='white' />
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
              bottom: -7,
              right: -7,
            }}
          >
            {renderChatType(chat.type)}
          </View>
        </View>
      );
    }
  };

  const renderChatSenderName = (chat) => {
    if (chat.user) {
      return chat.user.name;
    } else {
      return "This user doesn't exist.";
    }
  };

  const renderChats = () => {
    // const chats = myUpcomingMeetupAndChatsTable[meetup._id];
    if (chats.length) {
      const chatsList = chats.map((chat, index) => {
        // launcherのchatだけは、背景を少し変える。
        return (
          <TouchableOpacity key={index} style={{ padding: 10 }} onLongPress={() => console.log('hello')}>
            <View style={{ flexDirection: 'row' }}>
              {renderUserAvatar(chat)}
              <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                <View style={{ flexDirection: 'row', marginBottom: 5, flexShrink: 1 }}>
                  <Text
                    style={{
                      color: baseTextColor,
                      marginRight: 10,
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}
                  >
                    {renderChatSenderName(chat)}
                  </Text>
                  {renderDate(chat.createdAt)}
                </View>
                <Text style={{ fontSize: 15, marginBottom: 10, color: baseTextColor }}>{chat.content}</Text>
                {chat.replyTo ? (
                  <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ color: iconColorsTable['blue1'], marginRight: 5 }}>
                          @ {chat.replyTo.user.name}
                        </Text>
                        {renderDate(chat.replyTo.createdAt)}
                      </View>
                      <Text style={{ color: 'rgb(118, 120, 124)' }}>{chat.replyTo.content}</Text>
                    </View>
                  </View>
                ) : null}

                {chat.user ? (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: screenSectionBackgroundColor,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 7,
                        paddingRight: 7,
                        borderRadius: 7,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        setReplyingTo(chat);
                        sendChatBottomSheetRef.current.snapToIndex(0);
                        textInputRef.current.focus();
                      }}
                    >
                      <MaterialCommunityIcons name='reply' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                      <Text style={{ color: baseTextColor }}>Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: screenSectionBackgroundColor,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 7,
                        paddingRight: 7,
                        borderRadius: 7,
                      }}
                      onPress={() => {
                        navigation.navigate('Report meetup member', {
                          userId: chat.user._id,
                          userName: chat.user.name,
                          meetupId: meetup._id,
                        });
                      }}
                    >
                      <MaterialIcons name='report-problem' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                      <Text style={{ color: baseTextColor }}>Report</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        );
      });

      return <View style={{}}>{chatsList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor, textAlign: 'center', marginTop: 50, fontSize: 15 }}>
            You'll see all the private chat messages of this meetup.
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
