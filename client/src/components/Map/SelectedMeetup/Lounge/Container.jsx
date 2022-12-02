// main libraries
import React, { useEffect, useState, useRef } from 'react';
import LoungeContext from './LoungeContext';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import lampostAPI from '../../../../apis/lampost';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
// components
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import SendChatBottomSheet from './SendChatBottomSheet';
import CrewBottomSheet from './CrewBottomSheet';
import Chats from './Chats';
import SnackBar from '../../../Utils/SnackBar';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';
import { setIsCrewBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);
  const appMenuBottomSheetRef = useRef(null);
  const sendChatBottomSheetRef = useRef(null);
  const crewBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    setMeetup(meetup);
    setChats(meetup.chatRoom.chats);
  };

  useEffect(() => {
    getMeetup();
  }, []);

  useEffect(() => {
    if (meetup) {
      props.auth.socket.emit('JOIN_A_LOUNGE', { chatRoom: meetup.chatRoom._id, socketId: props.auth.socket.id });

      props.auth.socket.on('SOMEONE_JOINED_TO_MY_LOUNGE', (data) => {
        console.log(data.message);
      });
    }

    return () => {
      props.auth.socket.off('SOMEONE_JOINED_TO_MY_LOUNGE');
    };
  }, [meetup]);

  useEffect(() => {
    if (meetup) {
      props.auth.socket.on('SOMEONE_JOINED_TO_MY_LOUNGE', (data) => {
        console.log(data.message);
      });
    }

    return () => {
      props.auth.socket.off('SOMEONE_JOINED_TO_MY_LOUNGE');
    };
  }, [meetup]);

  useEffect(() => {
    props.auth.socket.on('SOMEONE_SENT_A_CHAT_TO_MY_GROUP', (data) => {
      setChats((previous) => [...previous, data.chat]);
    });

    // return () => {
    //   props.auth.socket.off('SOMEONE_SENT_A_CHAT_TO_MY_GROUP');
    // };
  }, []);

  // useEffect(() => {
  //   // lounge出た時の時間をapi request送らないといけない。
  //   return () => {
  //     if (props.bottomSheet.textBox.isOpen) {
  //       props.setIsTextBoxBottomSheetOpen(false);
  //     }
  //     if (props.bottomSheet.crew.isOpen) {
  //       props.setIsCrewBottomSheetOpen(false);
  //     }
  //   };
  // });

  // ここに入った時点で、chatroomのidを持っている状態になる。
  return (
    <LoungeContext.Provider
      value={{
        meetup,
        navigation: props.navigation,
        appMenuBottomSheetRef,
        sendChatBottomSheetRef,
        crewBottomSheetRef,
        textInputRef,
        chats,
        setChats,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Chats />
        <AppMenuBottomSheet />
        <SendChatBottomSheet />
        <CrewBottomSheet />
        <SnackBar />
      </View>
    </LoungeContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen, setIsCrewBottomSheetOpen })(Container);
