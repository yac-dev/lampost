import React, { useMemo, useContext, useState } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import FriendChatRoomContext from './FriendChatRoomContext';
import lampostAPI from '../../../../apis/lampost';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../../utils/colorsTable';
import { emojis } from '../../../../utils/emojisList';

const ChatTextInputBottomSheet = (props) => {
  const inputAccessoryViewID = 'CHAT_TEXT_INPUT';
  const snapPoints = useMemo(() => ['65%'], []);
  const { auth, setLoading } = useContext(GlobalContext);
  const { chatTextInputBottomSheetRef, chatTextInputRef, friendChatRoomId, friendId, setFriendChats } =
    useContext(FriendChatRoomContext);
  const [chatTextInput, setChatTextInput] = useState('');

  const renderEmoji = (emoji) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} onPress={() => setChatTextInput((previous) => previous + emoji)}>
        <Text>{emoji}</Text>
      </TouchableOpacity>
    );
  };
  const sendChat = async () => {
    const payload = {
      sender: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      recieverId: friendId,
      content: chatTextInput,
      type: 'text',
      friendChatRoomId,
    };
    setLoading(true);
    const result = await lampostAPI.post('/friendchats', payload);
    const { chat } = result.data;
    setFriendChats((previous) => [...previous, chat]);
    setLoading(false);
    chatTextInputBottomSheetRef.current.close();
    Keyboard.dismiss();
    setChatTextInput('');
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={chatTextInputBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
      // onClose={() => setText('')}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder={'Type your message...'}
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 10,
              height: '100%',
              // padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
            }}
            color={baseTextColor}
            ref={chatTextInputRef}
            value={chatTextInput}
            onChangeText={setChatTextInput}
            autoCapitalize='none'
          />
        </View>
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={screenSectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FlatList
                data={emojis}
                renderItem={({ item }) => renderEmoji(item)}
                keyExtractor={(item, index) => `${item}-${index}`}
                horizontal={true}
                keyboardShouldPersistTaps={'always'}
              />
            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View></View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => {
                    chatTextInputBottomSheetRef.current.close();
                    Keyboard.dismiss();
                    setChatTextInput('');
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => {
                    sendChat();
                  }}
                  disabled={chatTextInput ? false : true}
                >
                  <Text style={{ color: chatTextInput ? 'white' : disabledTextColor, fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ChatTextInputBottomSheet;
