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
  const {
    auth,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    setTotalUnreadChatsCount,
    routeName,
    setRouteName,
  } = useContext(GlobalContext);
  const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState(myUpcomingMeetupAndChatsTable[props.route.params.meetupId].chats);
  const appMenuBottomSheetRef = useRef(null);
  const sendChatBottomSheetRef = useRef(null);
  const crewBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

  // const getLoungeChatsByMeetupId = async () => {
  //   const result = await lampostAPI.get(`/loungechats/${props.route.params.meetupId}`);
  //   const { loungeChats } = result.data;
  //   setChats(loungeChats);
  // };
  const getSelectedMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/selected`);
    const { meetup } = result.data;
    setMeetup(meetup);
  };
  useEffect(() => {
    // getLoungeChatsByMeetupId();
    getSelectedMeetup();
  }, []);

  // useEffect(() => {
  //   auth.socket.on('SOMEONE_SENT_A_CHAT', (data) => {
  //     setChats((previous) => [...previous, data]);
  //   });

  //   return () => {
  //     auth.socket.off('SOMEONE_SENT_A_CHAT');
  //   };
  // }, []);
  console.log('Now in', routeName);
  useEffect(() => {
    setRouteName('Lounge');
    return () => {
      setRouteName('');
    };
  }, []);

  const updateviewedChatsLastTime = async (dateTime) => {
    const result = await lampostAPI.patch(`/users/${auth.data._id}/viewedchatslasttime`, {
      meetupId: props.route.params.meetupId,
      dateTime,
    });
  };
  useEffect(() => {
    return () => {
      const dateTime = new Date();
      console.log('cleaing up');
      // ?????????api request????????????viewd chats last time??????ok.
      updateviewedChatsLastTime(dateTime);
      setMyUpcomingMeetupAndChatsTable((previous) => {
        return {
          ...previous,
          [props.route.params.meetupId]: {
            ...previous[props.route.params.meetupId],
            viewedChatsLastTime: dateTime,
          },
        };
      });
    };
  }, []);

  useEffect(() => {
    const minus = myUpcomingMeetupAndChatsTable[props.route.params.meetupId].unreadChatsCount;
    setMyUpcomingMeetupAndChatsTable((previous) => {
      const updating = { ...previous };
      updating[props.route.params.meetupId].unreadChatsCount =
        updating[props.route.params.meetupId].unreadChatsCount - minus;
      return updating;
    });
    setTotalUnreadChatsCount((previous) => previous - minus);
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

  // ??????????????????????????????chatroom???id????????????????????????????????????
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
      </View>
    </LoungeContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, auth: state.auth };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen, setIsCrewBottomSheetOpen })(Container);
