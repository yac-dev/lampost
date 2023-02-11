import React, { useMemo, useContext, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';

import { addSnackBar } from '../../../../redux/actionCreators/snackBar';

const SendChatBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const inputAccessoryViewID = 'SEND_CHAT_INPUT';
  const snapPoints = useMemo(() => ['65%'], []);
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
  } = useContext(LoungeContext);
  const [text, setText] = useState('');
  const [chatType, setChatType] = useState('general');

  const onSendPress = async () => {
    console.log('sending comment');
    const payload = {
      launcher: meetup.launcher._id === auth.data._id ? '' : meetup.launcher._id,
      meetupId: meetup._id,
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
    // console.log(payload);
    auth.socket.emit('I_SEND_A_CHAT', payload);
    setSendingText('');
    setReplyingTo(null);
    Keyboard.dismiss();
    sendChatBottomSheetRef.current.close();
    // appMenuBottomSheetRef.current.snapToIndex(0);
  };

  return (
    <GorhomBottomSheet
      index={-1}
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
      onClose={() => setText('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {replyingTo ? (
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: iconColorsTable['blue1'] }}>@ {replyingTo.user.name}</Text>
          </View>
        ) : null}
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder='Add a chat message...'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 10,
              height: '100%',
              padding: 10,
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
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            {/* <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  Keyboard.dismiss()
                }
              >
                <Text>General</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Idea</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Question and Help</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Announcement</Text>
              </TouchableOpacity>
            </View> */}
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
                <Text style={{ color: iconColorsTable['blue1'], fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => onSendPress()}>
                <Text style={{ color: iconColorsTable['blue1'], fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { addSnackBar })(SendChatBottomSheet);
