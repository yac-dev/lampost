import React, { useMemo, useContext, useState, useEffect } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { emojis } from '../../../../utils/emojisList';

const SendChatBottomSheet = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const inputAccessoryViewID = 'SEND_CHAT_INPUT';
  const snapPoints = useMemo(() => ['75%'], []);
  const {
    appMenuBottomSheetRef,
    sendChatBottomSheetRef,
    textInputRef,
    setChats,
    meetup,
    sendingText,
    setSendingText,
    replyingTo,
    setReplyingTo,
    chatType,
    isSendChatBottomSheetOpen,
    setIsSendChatBottomSheetOpen,
  } = useContext(LoungeContext);
  // const [text, setText] = useState('');

  const renderEmoji = (emoji) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} onPress={() => setSendingText((previous) => previous + emoji)}>
        <Text>{emoji}</Text>
      </TouchableOpacity>
    );
  };

  const onSendPress = async () => {
    console.log('sending comment');
    setLoading(true);
    const payload = {
      launcher: meetup.launcher._id === auth.data._id ? '' : meetup.launcher._id,
      meetup: {
        _id: meetup._id,
        title: meetup.title,
      },
      user: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      content: sendingText,
      type: replyingTo ? 'reply' : chatType,
      replyTo: replyingTo
        ? {
            _id: replyingTo._id,
            content: replyingTo.content,
            user: replyingTo.user,
            createdAt: replyingTo.createdAt,
          }
        : null,
    };
    const result = await lampostAPI.post('/loungechats', payload);
    const { loungeChatObject } = result.data;
    setChats((previous) => [...previous, loungeChatObject]);
    // console.log(payload);
    // auth.socket.emit('I_SEND_A_CHAT', payload);
    setSendingText('');
    setReplyingTo(null);
    Keyboard.dismiss();
    sendChatBottomSheetRef.current.close();
    setLoading(false);
    // appMenuBottomSheetRef.current.snapToIndex(0);
  };

  const renderTextInputPlaceHolder = () => {
    switch (chatType) {
      case 'general':
        return 'Please type your chat message.';
      case 'question':
        return 'What is your question?';
      case 'help':
        return 'What is your problem?';
      default:
        return 'No';
    }
  };

  useEffect(() => {
    if (isSendChatBottomSheetOpen) {
      textInputRef.current.focus();
    }
  }, [isSendChatBottomSheetOpen]);

  if (isSendChatBottomSheetOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={sendChatBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        keyboardBehavior={'extend'}
        onClose={() => setIsSendChatBottomSheetOpen(false)}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
          {replyingTo ? (
            <View style={{}}>
              <Text style={{ color: iconColorsTable['blue1'] }}>@ {replyingTo.user.name}</Text>
            </View>
          ) : null}
          <View style={{ height: '100%', flexDirection: 'row' }}>
            <BottomSheetTextInput
              multiline={true}
              placeholder={renderTextInputPlaceHolder()}
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
              ref={textInputRef}
              value={sendingText}
              onChangeText={setSendingText}
              autoCapitalize='none'
            />
            {/* <View style={{ height: '100%', width: '10%' }}> ここ、後で修正する。
              <TouchableOpacity
                onPress={() =>
                  // keybord dismissとともに、snappointを15%にまで下げる。
                  console.log('hi')
                }
                style={{
                  backgroundColor: iconColorsTable['red1'],
                  padding: 5,
                  borderRadius: 7,
                  width: 25,
                  height: 25,
                  marginBottom: 10,
                }}
              >
                <FontAwesome5 name='photo-video' size={15} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  // keybord dismissとともに、snappointを15%にまで下げる。
                  console.log('hi')
                }
                style={{
                  backgroundColor: iconColorsTable['red1'],
                  padding: 5,
                  borderRadius: 7,
                  width: 25,
                  height: 25,
                }}
              >
                <FontAwesome name='camera' size={15} />
              </TouchableOpacity>
            </View> */}
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
                      Keyboard.dismiss();
                      setSendingText('');
                      setReplyingTo(null);
                      sendChatBottomSheetRef.current.close();
                      // appMenuBottomSheetRef.current.snapToIndex(0);
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => onSendPress()}
                    disabled={sendingText ? false : true}
                  >
                    <Text style={{ color: sendingText ? 'white' : baseTextColor, fontWeight: 'bold' }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </InputAccessoryView>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default SendChatBottomSheet;
