import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import FriendChatRoomContext from './FriendChatRoomContext';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import { iconsTable } from '../../../../utils/icons';
import ChatTextInputBottomSheet from './ChatTextInputBottomSheet';

const FriendChatRoomContainer = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth, setUnreadFriendChats, setFriendChatsNotificationCount } = useContext(GlobalContext);
  const [friendChats, setFriendChats] = useState([]);
  const [isFetchedFriendChats, setIsFetchedFriendChats] = useState(false);
  const chatTextInputBottomSheetRef = useRef(null);
  const chatTextInputRef = useRef(null);

  const getFriendChatsByChatRoomId = async () => {
    const result = await lampostAPI.get(`/friendchats/${props.route.params.friendChatRoomId}`);
    const { friendChats } = result.data;
    setFriendChats(friendChats);
    setIsFetchedFriendChats(true);
  };
  useEffect(() => {
    getFriendChatsByChatRoomId();
  }, []);
  // inboxから来た場合に、unreadをreadにするようにする。
  const updateUnreadToRead = async (chatIds) => {
    const payload = {
      chatIds,
    };
    const result = await lampostAPI.patch('/friendchats', payload);
  };

  useEffect(() => {
    if (props.route.params.fromInbox && props.route.params.chatIds) {
      setUnreadFriendChats((previous) => {
        const updating = { ...previous };
        delete updating[props.route.params.friendId];
        return updating;
      });
      setFriendChatsNotificationCount((previous) => (previous -= props.route.params.chatIds.length));
      updateUnreadToRead(props.route.params.chatIds);
    }
  }, []);

  const renderFriendChats = () => {
    if (friendChats.length) {
      return (
        <FlatList
          data={friendChats}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  padding: 10,
                  backgroundColor: screenSectionBackgroundColor,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <FastImage
                    source={{
                      uri: item.sender.photo
                        ? item.sender.photo
                        : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: iconColorsTable['blue1'],
                      borderRadius: 5,
                      marginRight: 20,
                    }}
                    resizeMode={'contain'}
                    tintColor={item.sender.photo ? null : 'white'}
                  />
                  <View>
                    <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>{item.sender.name}</Text>
                    <Text style={{ color: 'white', color: baseTextColor }}>{item.createdAt}</Text>
                  </View>
                </View>
                <Text style={{ color: 'white' }}>{item.content}</Text>
              </View>
            );
          }}
        />
      );
    } else {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>
          You'll see all the chat messages between your friend.
        </Text>
      );
    }
  };
  console.log(friendChats);
  return (
    <FriendChatRoomContext.Provider
      value={{
        chatTextInputBottomSheetRef,
        chatTextInputRef,
        friendChatRoomId: props.route.params.friendChatRoomId,
        friendId: props.route.params.friendId,
        setFriendChats,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        {isFetchedFriendChats ? renderFriendChats() : <ActivityIndicator />}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 50,
            alignSelf: 'center',
            padding: 10,
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 7,
          }}
          onPress={() => {
            chatTextInputRef.current.focus();
            chatTextInputBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <MaterialCommunityIcons name='send' size={25} color='white' />
        </TouchableOpacity>
        <ChatTextInputBottomSheet />
      </View>
    </FriendChatRoomContext.Provider>
  );
};

export default FriendChatRoomContainer;
