import React, { useEffect, useState, useRef, useContext } from 'react';
import LoungeContext from './LoungeContext';
import GlobalContext from '../../../../GlobalContext';
import { connect } from 'react-redux';
import { Touchable, View, TouchableOpacity, Text } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import lampostAPI from '../../../../apis/lampost';
// import { io } from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  baseBackgroundColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';
import MenuBottomSheet from './MenuBottomSheet';
import SendChatBottomSheet from './SendChatBottomSheet';
import CrewBottomSheet from './CrewBottomSheet';
import Chats from './Chats';
import ConfirmRSVPModal from './ConfirmRSVPModal';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import SnackBar from '../../../Utils/SnackBar';

const LoungeContainer = (props) => {
  const { auth, setAuth, myUpcomingMeetups, setMyUpcomingMeetups, setChatsNotificationCount, routeName, setRouteName } =
    useContext(GlobalContext);
  const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const appMenuBottomSheetRef = useRef(null);
  const sendChatBottomSheetRef = useRef(null);
  const crewBottomSheetRef = useRef(null);
  const selectedChatBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [sendingText, setSendingText] = useState('');
  const [chatType, setChatType] = useState('general'); // general, reply, question, help
  const [isLoggedOutModalOpen, setIsLoggedOutModalOpen] = useState(false);
  const [dummyCount, setDummyCount] = useState(0);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isConfirmRSVPModalOpen, setIsConfirmRSVPModalOpen] = useState(false);
  const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
  const [isSendChatBottomSheetOpen, setIsSendChatBottomSheetOpen] = useState(false);

  const getLoungeChatsByMeetupId = async () => {
    const result = await lampostAPI.get(`/loungechats/${props.route.params.meetupId}`);
    const { loungeChats } = result.data;
    setChats(loungeChats);
  };

  const getRSVPState = async () => {
    const result = await lampostAPI.get(
      `/meetupanduserrelationships/meetup/${props.route.params.meetupId}/user/${auth.data._id}/rsvp`
    );
    const { rsvp } = result.data;
    setIsRSVPed(rsvp);
  };

  const getSelectedMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/selected`);
    const { meetup } = result.data;
    setMeetup(meetup);
  };
  useEffect(() => {
    getLoungeChatsByMeetupId();
    getSelectedMeetup();
    getRSVPState();
  }, []);
  // loungechatsも、apiで持ってくる必要がる。

  // const getSocket = () => {
  //   // 'https://lampost-server-production.onrender.com/api'
  //   //
  //   // console.log(Constants.manifest.extra.socketEndpoint);
  //   // const { socketEndpoint } = Constants.manifest.extra.socketEndpoint;
  //   // 'http://192.168.11.5:3500'
  //   // const socket = io('https://lampost-server-production.onrender.com', {
  //   const socket = io('http://192.168.11.5:3500', {
  //     path: '/mysocket',
  //   });
  //   setAuth((previous) => {
  //     return { ...previous, socket: socket };
  //   });
  // };
  // useEffect(() => {
  //   getSocket();
  // }, []);

  // // roomに入る。
  // useEffect(() => {
  //   if (auth.socket) {
  //     auth.socket.emit('JOIN_A_LOUNGE', { meetupId: props.route.params.meetupId });
  //     return () => {
  //       // auth.socket.disconnect();
  //       auth.socket.emit('LEAVE_A_LOUNGE', { meetupId: props.route.params.meetupId, mySocketId: auth.socket.id });
  //       auth.socket.off('JOIN_A_LOUNGE');
  //     };
  //   }
  // }, [auth.socket]);

  // // chat send, getに関するuseEffect
  // useEffect(() => {
  //   if (auth.socket) {
  //     auth.socket.on('I_GOT_A_CHAT_IN_THE_ROOM', (data) => {
  //       setChats((previous) => [...previous, data]);
  //       console.log('now in lounge', routeName);
  //     });

  //     return () => {
  //       auth.socket.off('I_GOT_A_CHAT_IN_THE_ROOM');
  //     };
  //   }
  // }, [auth.socket]);

  // useEffect(() => {
  //   if (auth.socket) {
  //     const meetupIds = auth.data.upcomingMeetups.map((meetupObject) => meetupObject.meetup);
  //     auth.socket.emit('JOIN_LOUNGES', { meetupIds });

  //     return () => {
  //       auth.socket.off('JOIN_LOUNGES');
  //       // console.log('hello');
  //     };
  //   }
  // }, [auth.socket]);

  // experiment
  // useEffect(() => {
  //   auth.socket.on('YOUR_TEST_MESSAGE_OK', (data) => {
  //     console.log('Got message successfully', data);
  //     console.log('Count is', dummyCount);
  //   });
  // }, [dummyCount]);
  //　こういうことやると、多分dummyCountが更新されるたびに、registrationが追加されていくんだろう。いわゆる、
  // auth.socket.on()
  // auth.socket.on()
  // auth.socket.on()っていう感じで、多分registrationが増える、多分そうだろうね。なんか分かった。
  // しかも面白いことに、その時点でのstateそのまま記憶して、logしている。面白い実験だ。
  // あと、socket connectが繰り返されても同じことが起こるだろう。。。

  // useEffect(() => {
  //   auth.socket.on('SOMEONE_SENT_A_CHAT', (data) => {
  //     setChats((previous) => [...previous, data]);
  //   });

  //   return () => {
  //     auth.socket.off('SOMEONE_SENT_A_CHAT');
  //   };
  // }, []);
  // console.log('Now in', routeName);

  // これなんだ？？
  // useEffect(() => {
  //   setRouteName('Lounge');
  //   return () => {
  //     setRouteName('');
  //   };
  // }, []);

  // 部屋を出る時
  const updateviewedChatsLastTime = async (dateTime) => {
    const result = await lampostAPI.patch(
      `/meetupanduserrelationships/meetup/${props.route.params.meetupId}/user/${auth.data._id}/viewedchatslasttime`
    );
  };
  useEffect(() => {
    return () => {
      // これも、authがある時のみに動かさなきゃ毛ない。だから、dependencyも入れなきゃかも。最初の状態でregisterしているかもしれんから。
      updateviewedChatsLastTime();
    };
  }, []);

  // 部屋に入った時
  // setMyUpcomingMeetups, setChatsNotificationCount
  useEffect(() => {
    let minus = 0;
    for (const chatType in myUpcomingMeetups[props.route.params.meetupId].unreadChatsTable) {
      minus = minus + myUpcomingMeetups[props.route.params.meetupId].unreadChatsTable[chatType];
      // console.log(myUpcomingMeetups[props.route.params.meetupId].unreadChatsTable[chatType])
    }
    console.log(minus);
    setChatsNotificationCount((previous) => previous - minus);
    setMyUpcomingMeetups((previous) => {
      return {
        ...previous,
        [props.route.params.meetupId]: {
          ...previous[props.route.params.meetupId],
          unreadChatsTable: {
            general: 0,
            reply: 0,
            question: 0,
            help: 0,
          },
        },
      };
    });
  }, []);

  return (
    <LoungeContext.Provider
      value={{
        meetup,
        meetupId: props.route.params.meetupId,
        navigation: props.navigation,
        appMenuBottomSheetRef,
        sendChatBottomSheetRef,
        crewBottomSheetRef,
        selectedChatBottomSheetRef,
        sendingText,
        setSendingText,
        replyingTo,
        setReplyingTo,
        textInputRef,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        chatType,
        setChatType,
        isRSVPed,
        setIsRSVPed,
        isConfirmRSVPModalOpen,
        setIsConfirmRSVPModalOpen,
        isMenuBottomSheetOpen,
        setIsMenuBottomSheetOpen,
        isSendChatBottomSheetOpen,
        setIsSendChatBottomSheetOpen,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Chats />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderRadius: 10,
            backgroundColor: iconColorsTable['lightBlue1'],
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            setIsMenuBottomSheetOpen(true);
            // appMenuBottomSheetRef.current.snapToIndex(0)
          }}
        >
          <Ionicons name='send' size={25} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Action</Text>
        </TouchableOpacity>
        <MenuBottomSheet />
        <SendChatBottomSheet />
      </View>
    </LoungeContext.Provider>
  );
};

export default LoungeContainer;
