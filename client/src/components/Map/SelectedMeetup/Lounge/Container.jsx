import React, { useEffect, useState, useRef, useContext } from 'react';
import LoungeContext from './LoungeContext';
import GlobalContext from '../../../../GlobalContext';
import { connect } from 'react-redux';
import { Touchable, View, TouchableOpacity, Text } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import lampostAPI from '../../../../apis/lampost';
import { io } from 'socket.io-client';
``;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { baseBackgroundColor, rnDefaultBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import SendChatBottomSheet from './SendChatBottomSheet';
import CrewBottomSheet from './CrewBottomSheet';
import Chats from './Chats';

const LoungeContainer = (props) => {
  const {
    auth,
    setAuth,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    setTotalUnreadChatsCount,
    routeName,
    setRouteName,
  } = useContext(GlobalContext);
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
  const [isLoggedOutModalOpen, setIsLoggedOutModalOpen] = useState(false);
  const [dummyCount, setDummyCount] = useState(0);

  const getLoungeChatsByMeetupId = async () => {
    const result = await lampostAPI.get(`/loungechats/${props.route.params.meetupId}`);
    const { loungeChats } = result.data;
    setChats(loungeChats);
  };

  const getSelectedMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/selected`);
    const { meetup } = result.data;
    setMeetup(meetup);
  };
  useEffect(() => {
    getLoungeChatsByMeetupId();
    getSelectedMeetup();
  }, []);
  // loungechatsも、apiで持ってくる必要がる。

  const getSocket = () => {
    // 'https://lampost-server-production.onrender.com/api'
    //
    // console.log(Constants.manifest.extra.socketEndpoint);
    // const { socketEndpoint } = Constants.manifest.extra.socketEndpoint;
    // 'http://192.168.11.5:3500'
    // const socket = io('https://lampost-server-production.onrender.com', {
    const socket = io('http://192.168.11.5:3500', {
      path: '/mysocket',
    });
    setAuth((previous) => {
      return { ...previous, socket: socket };
    });
  };
  useEffect(() => {
    getSocket();
  }, []);

  // roomに入る。
  useEffect(() => {
    if (auth.socket) {
      auth.socket.emit('JOIN_A_LOUNGE', { meetupId: props.route.params.meetupId });
      return () => {
        // auth.socket.disconnect();
        auth.socket.emit('LEAVE_A_LOUNGE', { meetupId: props.route.params.meetupId, mySocketId: auth.socket.id });
        auth.socket.off('JOIN_A_LOUNGE');
      };
    }
  }, [auth.socket]);

  // chat send, getに関するuseEffect
  useEffect(() => {
    // if (auth.socket && routeName === 'Lounge') {
    // 待機開始。
    if (auth.socket) {
      auth.socket.on('I_GOT_A_CHAT_IN_THE_ROOM', (data) => {
        setChats((previous) => [...previous, data]);
        console.log('now in lounge', routeName);
      });

      return () => {
        auth.socket.off('I_GOT_A_CHAT_IN_THE_ROOM');
      };
    }
  }, [auth.socket]);

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

  const updateviewedChatsLastTime = async (dateTime) => {
    const result = await lampostAPI.patch(`/users/${auth.data._id}/viewedchatslasttime`, {
      meetupId: props.route.params.meetupId,
      dateTime,
    });
  };
  useEffect(() => {
    return () => {
      // これも、authがある時のみに動かさなきゃ毛ない。だから、dependencyも入れなきゃかも。最初の状態でregisterしているかもしれんから。
      const dateTime = new Date();
      // console.log('cleaing up');
      // ここでapi requestをする。viewd chats last timeの。ok.
      updateviewedChatsLastTime(dateTime); // これは必要。
      setMyUpcomingMeetupAndChatsTable((previous) => {
        return {
          ...previous,
          [props.route.params.meetupId]: {
            ...previous[props.route.params.meetupId],
            viewedChatsLastTime: dateTime,
          },
        };
      });
      // setAuth((previous) => {
      //   return {
      //     ...previous,
      //     data: {
      //       ...previous.data,
      //       upcomingMeetups: [...previous.data.upcomingMeetups].forEach((element) => {
      //         if (element.meetup === props.route.params.meetupId) {
      //           element.viewedChatsLastTime = dateTime;
      //           return element;
      //         }
      //       }),
      //     },
      //   };
      // });
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

  return (
    <LoungeContext.Provider
      value={{
        meetup,
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
        // isLoggedOutModalOpen,
        // setIsLoggedOutModalOpen,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {/* <TouchableOpacity
          onPress={() => {
            sendTestMessage();
            setDummyCount((previous) => previous + 1);
          }}
        >
          <Text style={{ color: 'red', fontSize: 30 }}>Press to send message</Text>
        </TouchableOpacity> */}
        <Chats />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            backgroundColor: rnDefaultBackgroundColor,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
        >
          <View
            style={{
              backgroundColor: iconColorsTable['lightBlue1'],
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='send' size={25} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Menu</Text>
            <MaterialCommunityIcons name='chevron-down' size={25} color={'white'} />
          </View>
        </TouchableOpacity>
        <AppMenuBottomSheet />
        <SendChatBottomSheet />
        {/* <CrewBottomSheet /> */}
      </View>
    </LoungeContext.Provider>
  );
};

export default LoungeContainer;
