import React, { useRef, useState, useEffect } from 'react';
import lampostAPI from '../../../../apis/lampost';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  TouchableOpacity,
} from 'react-native';
import { IconButton, Menu, Provider, Button } from 'react-native-paper';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const TextBox = (props) => {
  const snapPoints = ['10%', '65%'];
  const inputAccessoryViewID = '111111111';
  const [content, setContent] = useState('');
  const [chatType, setChatType] = useState('general');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onTextBoxBottomSheetClose = () => {
    if (props.bottomSheet.textBox.isOpen) {
      props.setIsTextBoxBottomSheetOpen(false);
      Keyboard.dismiss();
    }
  };

  const onSendPress = async () => {
    console.log('sending comment');
    // props.setIsTextBoxBottomSheetOpen(false);
    const body = {
      chatRoomId: props.meetup.chatRoom._id,
      userId: props.auth.data._id,
      content,
      type: chatType,
    };
    console.log(body);
    const result = await lampostAPI.post('/chats', body);
    const { chat } = result.data;
    props.setChats((previous) => [...previous, chat]);
    props.auth.socket.emit('I_SEND_A_CHAT_TO_MY_GROUP', { chat, chatRoom: props.meetup.chatRoom._id });
    Keyboard.dismiss();
    setContent('');
  };

  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={props.textBoxBottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      keyboardBehavior={'extend'}
      onClose={() => onTextBoxBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button icon='send' mode='outlined' onPress={() => onSendPress()}>
            Send
          </Button>
        </View> */}
        {/* <TextInput
          multiline={true}
          placeholder='Add a message' // ここを、bottom sheetのmax分に広げる。 // scrollableにすればいいと思う。。。
          inputAccessoryViewID={inputAccessoryViewID}
          style={{ borderRadius: 10, height: '100%' }}
          ref={props.textInputRef}
          value={content}
          onChangeText={setContent}
        /> わざと、bottomsheetではなくtextinputを使って、keybordbehaviourを防ぐ方法もある。これ重要。*/}
        <BottomSheetTextInput
          multiline={true}
          placeholder='Add a message'
          inputAccessoryViewID={inputAccessoryViewID}
          style={{ borderRadius: 10, height: '100%', padding: 10, backgroundColor: 'red' }}
          ref={props.textInputRef}
          value={content}
          onChangeText={setContent}
        />
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor='hsl(0, 0%, 95%)' style={{ padding: 5 }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  // keybord dismissとともに、snappointを15%にまで下げる。
                  Keyboard.dismiss()
                }
              >
                <Text>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(TextBox);
