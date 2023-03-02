import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import lampostAPI from '../../../apis/lampost';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatStatus from '../ChatStatus';

const Container = (props) => {
  const {
    auth,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    totalUnreadChatsCount,
    myUpcomingMeetups,
    setMyUpcomingMeetups,
  } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    myUpcomingMeetupsBottomSheetRef,
    selectedMeetup,
    setSelectedMeetup,
    selectedMeetupBottomSheetRef,
    navigation,
    setIsFinishMeetupConfirmationModalOpen,
    setIsStartMeetupConfirmationModalOpen,
    setStartingMeetup,
    setFinishingMeetup,
  } = useContext(MapContext);

  // console.log(myUpcomingMeetupAndChatsTable);
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          // padding: 10,
          borderRadius: 7,
          marginRight: 15,
          backgroundColor: screenSectionBackgroundColor,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <Text style={{ color: 'white' }}>
        Starts at&nbsp;{dateTable[1]}
        {dateTable[2]}
      </Text>
    );
  };

  const renderMeetupDateAndTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateElements = d.split(',').join('').split(' ');

    return (
      <View style={{ flexDirection: 'row' }}>
        {dateElements.map((element, index) => {
          return (
            <Text key={index} style={{ color: 'white' }}>
              {element}&nbsp;
            </Text>
          );
        })}
      </View>
    );
    // return (
    //   <View style={{}}>
    //     <Text style={{ color: 'white' }}>
    //       {dateElements[0]}&nbsp;{dateElements[1]}&nbsp;{dateElements[2]}&nbsp;{dateElements[3]}&nbsp;{dateElements[4]}
    //       &nbsp;{dateElements[5]}
    //     </Text>
    //   </View>
    // );
  };

  const renderStartButton = (meetupAndChatsTable) => {
    if (meetupAndChatsTable.state === 'upcoming') {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            padding: 5,
            borderRadius: 10,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            // まず確認のmodalをだす。
            // ここで、時間の確認を必ずしないといけない。10分前っていうことを。
            // const result = await lampostAPI.patch(`/meetups/${meetupAndChatsTable._id}/start`);
            setStartingMeetup(meetupAndChatsTable._id);
            setIsStartMeetupConfirmationModalOpen(true);
            // setMyUpcomingMeetupAndChatsTable((previous) => {
            //   return {
            //     ...previous,
            //     [meetupAndChatsTable._id]: {
            //       ...previous[meetupAndChatsTable._id],
            //       state: 'ongoing',
            //     },
            //   };
            // });
          }}
        >
          <Ionicons size={25} name='power' color={'white'} style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Start meetup</Text>
        </TouchableOpacity>
      );
    } else if (meetupAndChatsTable.state === 'ongoing') {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['red1'],
            padding: 5,
            borderRadius: 10,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            // ここでも、確認のmodalを出す。
            // ここのfinishはいつでもいいとしよう。
            setFinishingMeetup(meetupAndChatsTable._id);
            setIsFinishMeetupConfirmationModalOpen(true);
            // setMyUpcomingMeetupAndChatsTable((previous) => {
            //   return {
            //     ...previous,
            //     [meetupAndChatsTable._id]: {
            //       ...previous[meetupAndChatsTable._id],
            //       state: 'upcoming',
            //     },
            //   };
            // });
          }}
        >
          <Ionicons size={25} name='power' color={'white'} style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Finish meetup</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderUnreadChats = (meetupUnreadChatsTable) => {
    const unreadChatsList = Object.keys(meetupUnreadChatsTable);
    if (unreadChatsList.length) {
      const list = unreadChatsList.map((key) => {
        return <ChatStatus key={key} chatType={key} status={meetupUnreadChatsTable[key]} />;
      });
      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
    }
  };

  const renderChatStats = (meetup) => {
    const list = Object.keys(meetup.unreadChatsTable).map((key) => {
      return <ChatStatus key={key} chatType={key} status={meetup.unreadChatsTable[key]} />;
    });

    return (
      <TouchableOpacity
        style={{
          width: 86,
          height: 86,
          padding: 8,
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: screenSectionBackgroundColor,
          borderRadius: 10,
          // flexDirection: 'row',
          // flexWrap: 'wrap',
          // justifyContent: 'space-between',
        }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Lounge', { meetupId: meetup._id });
        }}
      >
        <View
          style={{
            // width: '100%',
            // height: '100%',
            // backgroundColor: 'violet',
            flexDirection: 'row',
            flexWrap: 'wrap',
            // alignItems: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
            // alignSelf: 'flex-end',
          }}
        >
          {list}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMyUpcomingMeetups = () => {
    const myUpcomingMeetupsArr = Object.values(myUpcomingMeetups);
    if (myUpcomingMeetupsArr.length) {
      const myUpcomingMeetupslist = myUpcomingMeetupsArr.map((meetup, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              // paddingLeft: 15,
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              onPress={() => getMeetup(meetup._id)}
            >
              {/* {renderDate(meetup.startDateAndTime)} */}
              <TouchableOpacity onPress={() => getMeetup(meetup._id)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                    backgroundColor: screenSectionBackgroundColor,
                    alignSelf: 'flex-start',
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                >
                  <MaterialCommunityIcons name='calendar-clock' color='white' size={20} style={{ marginRight: 10 }} />
                  {renderMeetupDateAndTime(meetup.startDateAndTime)}
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 5 }}>
                  {meetup.title}
                </Text>
              </TouchableOpacity>
              {renderChatStats(meetup)}
              {/* <View style={{ flexDirection: 'column', marginRight: 5, flexShrink: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 5 }}>
                  {meetup.title}
                </Text>
              </View> */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {meetup.launcher === auth.data._id ? (
                <>{renderStartButton(meetup)}</> // launcherじゃなければ、これをrenderしない。
              ) : null}
              {/* <TouchableOpacity
                style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10 }}
                onPress={() => {
                  appMenuBottomSheetRef.current.close();
                  navigation.navigate('Lounge', { meetupId: meetup._id });
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons size={25} name='ios-chatbubbles' color={'white'} style={{ marginRight: 5 }} />
                  <Text style={{ color: 'white', marginRight: 5 }}>Lounge</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
        );
      });

      return <View style={{}}>{myUpcomingMeetupslist}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>You'll see all the meetups that you've launched or joined.</Text>;
    }
  };

  const getMeetup = async (meetupId) => {
    myUpcomingMeetupsBottomSheetRef.current.close();
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
    selectedMeetupBottomSheetRef.current.snapToIndex(0);
  };

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>{renderMyUpcomingMeetups()}</BottomSheetScrollView>
  );
};

export default Container;
