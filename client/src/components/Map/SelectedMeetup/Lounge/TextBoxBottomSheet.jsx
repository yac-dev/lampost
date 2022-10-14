import React, { useRef, useState, useEffect } from 'react';
import lampostAPI from '../../../../apis/lampost';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  const snapPoints = ['65%', '80%', '100%'];
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

  // if (props.bottomSheet.textBox.isOpen) {
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.textBoxBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onTextBoxBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button icon='send' mode='outlined' onPress={() => onSendPress()}>
            Send
          </Button>
        </View>
        <TextInput
          multiline={true}
          placeholder='Write your comment' // ここを、bottom sheetのmax分に広げる。
          inputAccessoryViewID={inputAccessoryViewID}
          style={{ borderRadius: 10, height: '100%' }}
          ref={props.textInputRef}
          value={content}
          onChangeText={setContent}
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
  // } else {
  //   return null;
  // }
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(TextBox);
