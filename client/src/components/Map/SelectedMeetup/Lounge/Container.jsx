// main libraries
import React, { useEffect, useState, useRef, useContext } from 'react';
import LoungeContext from './LoungeContext';
import GlobalContext from '../../../../GlobalContext';
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
  const { auth } = useContext(GlobalContext);
  // const [meetup, setMeetup] = useState();
  const [chats, setChats] = useState([]);
  const appMenuBottomSheetRef = useRef(null);
  const sendChatBottomSheetRef = useRef(null);
  const crewBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

  const getLoungeChatsByMeetupId = async () => {
    const result = await lampostAPI.get(`/loungechats/${props.route.params.meetupId}`);
    const { loungeChats } = result.data;
    setChats(loungeChats);
  };
  useEffect(() => {
    getLoungeChatsByMeetupId();
    // setChats(myUpcomingMeetups[props.route.params.meetupId].chats);
  }, []);

  // useEffect(() => {
  //   auth.socket.emit('JOIN_A_LOUNGE', { chatRoom: props.route.params.meetup.chatRoom, socketId: auth.socket.id });
  //   auth.socket.on('SOMEONE_JOINED_TO_MY_LOUNGE', (data) => {
  //     console.log(data.message);
  //   });

  //   return () => {
  //     auth.socket.off('JOIN_A_LOUNGE');
  //     auth.socket.off('SOMEONE_JOINED_TO_MY_LOUNGE');
  //   };
  // }, []);

  // useEffect(() => {
  //   auth.socket.on('SOMEONE_JOINED_TO_MY_LOUNGE', (data) => {
  //     console.log(data.message);
  //   });

  //   return () => {
  //     auth.socket.off('SOMEONE_JOINED_TO_MY_LOUNGE');
  //   };
  // }, []);

  // useEffect(() => {
  //   auth.socket.on('SOMEONE_SENT_A_CHAT_TO_MY_GROUP', (data) => {
  //     console.log('got message');
  //     setChats((previous) => [...previous, data]);
  //   });

  //   return () => {
  //     auth.socket.off('SOMEONE_SENT_A_CHAT_TO_MY_GROUP');
  //   };
  // }, []);

  // ここに入った時点で、chatroomのidを持っている状態になる。
  return (
    <LoungeContext.Provider
      value={{
        meetup: props.route.params.meetupId,
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
        {/* <CrewBottomSheet /> */}
      </View>
    </LoungeContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen, setIsCrewBottomSheetOpen })(Container);
