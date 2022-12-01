import React, { useMemo, useContext, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import LoungeContext from './LoungeContext';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, sectionBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

import { addSnackBar } from '../../../../redux/actionCreators/snackBar';

const SendChatBottomSheet = (props) => {
  const inputAccessoryViewID = 'SEND_CHAT_INPUT';
  const snapPoints = useMemo(() => ['65%'], []);
  const { appMenuBottomSheetRef, sendChatBottomSheetRef, textInputRef, setChats, meetup } = useContext(LoungeContext);
  const [text, setText] = useState('');
  const [chatType, setChatType] = useState('general');

  const onSendPress = async () => {
    console.log('sending comment');
    const chatObject = {
      text: text,
      chatRoomId: meetup.chatRoom._id,
      userId: props.auth.data._id,
      type: chatType,
    };
    // これ、そもそもapi requestである必要あるのかな。。。。普通にsocket eventだけで良くないか？
    // const result = await lampostAPI.post('/chats', body);
    // const { chat } = result.data;
    // setChats((previous) => [...previous, chat]);
    props.auth.socket.emit('I_SEND_A_CHAT_TO_MY_GROUP', chatObject);
    setText('');
    Keyboard.dismiss();
    sendChatBottomSheetRef.current.close();
    appMenuBottomSheetRef.current.snapToIndex(0);
    // props.addSnackBar('Message sent successfully!', 'success', 7000);
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
      keyboardBehavior={'extend'}
      onClose={() => setText('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder='Add a message'
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
            value={text}
            onChangeText={setText}
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
                  sendChatBottomSheetRef.current.close();
                  appMenuBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => onSendPress()}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
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
