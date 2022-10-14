// main libraries
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import lampostAPI from '../../../../apis/lampost';

// components
import Chats from './Chats';
import TextBox from './TextBox';
import FABMenu from './FABMenu';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);
  const textBoxBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

  const handleTextBoxBottomSheet = () => {
    if (!props.bottomSheet.textBox.isOpen) {
      // props.setIsPostBottomSheetOpen(false);
      // postBottomSheetRef.current?.close();
      props.setIsTextBoxBottomSheetOpen(true);
      textBoxBottomSheetRef.current?.snapToIndex(0);
      textInputRef.current.focus();
    } else if (props.bottomSheet.selectedItem.isOpen) {
      // 開いている状態なら。
      // console.log(meetupId);
      // props.selectMeetup(meetupId);
      // props.setIsSelectedItemBottomSheetOpen(false);
      // selectedItemBottomSheetRef.current.close();
      // bottomSheetRef.current?.snapToIndex(-1);
    }
  };

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    console.log(meetup);
    // console.log(meetup);
    setMeetup(meetup);
    setChats((previous) => {
      return [...previous, ...meetup.chatRoom.chats];
    });
  };

  useEffect(() => {
    getMeetup();
  }, []);

  useEffect(() => {
    if (meetup) {
      props.auth.socket.emit('JOIN_LOUNGE', { chatRoom: meetup.chatRoom._id });
    }
  }, [meetup]);

  useEffect(() => {
    props.auth.socket.on('A_PEER_SEND_A_CHAT_TO_MY_GROUP', (data) => {
      setChats((previous) => [...previous, data.chat]);
    });
  }, []);

  useEffect(() => {
    // lounge出た時の時間をapi request送らないといけない。
    return () => {
      if (props.bottomSheet.textBox.isOpen) {
        props.setIsTextBoxBottomSheetOpen(false);
      }
    };
  });

  // fabボタンやらをどっかに置いておいて、それをtapしてtextBoxのbottomSheetを出すようにする感じかな。
  // ここに入った時点で、chatroomのidを持っている状態になる。
  return (
    <View style={{ flex: 1 }}>
      <Chats chats={chats} />
      <TextBox
        meetup={meetup}
        textBoxBottomSheetRef={textBoxBottomSheetRef}
        textInputRef={textInputRef}
        setChats={setChats}
      />
      <FABMenu handleTextBoxBottomSheet={handleTextBoxBottomSheet} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(Container);
