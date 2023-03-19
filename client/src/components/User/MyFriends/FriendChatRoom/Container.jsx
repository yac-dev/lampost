import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import FriendChatRoomContext from './FriendChatRoomContext';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import { iconsTable } from '../../../../utils/icons';
import ChatTextInputBottomSheet from './ChatTextInputBottomSheet';

const FriendChatRoomContainer = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const [friendChats, setFriendChats] = useState([]);
  const [isFetchedFriendChats, setIsFetchedFriendChats] = useState(false);
  const chatTextInputBottomSheetRef = useRef(null);
  const chatTextInputRef = useRef(null);

  const getFriendChatsByChatRoomId = async () => {
    const result = await lampostAPI.get(`/friendchats/${props.route.params.friendObject.friendChatRoom}`);
    const { friendChats } = result.data;
    setFriendChats(friendChats);
    setIsFetchedFriendChats(true);
  };
  useEffect(() => {
    getFriendChatsByChatRoomId();
  }, []);

  const renderFriendChats = () => {
    if (friendChats.length) {
      return (
        <FlatList
          data={friendChats}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={{ color: 'red' }}>{item.content}</Text>
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
        friendObject: props.route.params.friendObject,
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
