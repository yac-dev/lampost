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
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../utils/colorsTable';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';
import { addSnackBar } from '../../../../redux/actionCreators/snackBar';

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
    props.textBoxBottomSheetRef.current?.snapToIndex(0);
    props.addSnackBar('Message sent successfully!', 'success', 7000);
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
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder='Add a message'
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 10,
              height: '100%',
              padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
            }}
            ref={props.textInputRef}
            value={content}
            onChangeText={setContent}
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
          backgroundColor='hsl(0, 0%, 95%)'
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  // keybord dismissとともに、snappointを15%にまで下げる。
                  Keyboard.dismiss()
                }
              >
                {/* <MaterialCommunityIcons name='comment-text' />; */}
                <Text>General</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
                <Text>Idea</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
                <Text>Question and Help</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <FontAwesome5 name='question' size={15} color={'white'} />; */}
                <Text>Announcement</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => onSendPress()}>
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

// case 'general':
//         return <MaterialCommunityIcons name='comment-text' size={15} color={'white'} />;
//       case 'idea':
//         return <Ionicons name='bulb-outline' size={15} color={'white'} />;
//       case 'questionOrHelp':
//         return <FontAwesome5 name='question' size={15} color={'white'} />;
//       case 'announcement':
//         return <Entypo name='megaphone' size={15} color={'white'} />;

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen, addSnackBar })(TextBox);
