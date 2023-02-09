// main libraries
import React, { useContext, useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { backgroundColorsTable, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import ActionButton from '../../Utils/ActionButton';

const ActionButtons = (props) => {
  const {
    auth,
    setAuth,
    setLoading,
    setSnackBar,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    isIpad,
  } = useContext(GlobalContext);
  const { selectedMeetup, setSelectedMeetup, navigation } = useContext(MapContext);

  const joinMeetup = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(`/meetups/${selectedMeetup._id}/join`, { userId: auth.data._id });
    const { meetupObject, totalAttendees } = result.data;
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [...previous.data.upcomingMeetups, meetupObject],
        },
      };
    });
    // launcherが必要か。
    setMyUpcomingMeetupAndChatsTable((previous) => {
      return {
        ...previous,
        [selectedMeetup._id]: {
          _id: selectedMeetup._id,
          startDateAndTime: selectedMeetup.startDateAndTime,
          title: selectedMeetup.title,
          chats: meetupObject.loungeChats,
          unreadChatsCount: 0,
          viewedChatsLastTime: new Date(),
          launcher: meetupObject.launcher,
          state: meetupObject.state,
        },
      };
    });
    auth.socket.emit('JOIN_A_LOUNGE', { meetupId: selectedMeetup._id });
    setSelectedMeetup((previous) => {
      return {
        ...previous,
        totalAttendees,
      };
    });
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Joined the meetup successfully.', barType: 'success', duration: 5000 });
  };

  const leaveMeetup = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(`/meetups/${selectedMeetup._id}/leave`, { userId: auth.data._id });
    const { meetupId, totalAttendees } = result.data; // filteringするだけよ。
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [...previous.data.upcomingMeetups].filter(
            (upcomingMeetupObject) => upcomingMeetupObject.meetup._id !== meetupId
          ),
        },
      };
    });
    setMyUpcomingMeetupAndChatsTable((previous) => {
      const updating = { ...previous };
      delete updating[selectedMeetup._id];
      return updating;
    });
    // socketのgroupから抜ける。
    auth.socket.emit('LEAVE_A_LOUNGE', { meetupId: selectedMeetup._id });
    setSelectedMeetup((previous) => {
      return {
        ...previous,
        totalAttendees,
      };
    });
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Left the meetup successfully.', barType: 'success', duration: 5000 });
  };

  const startMeetup = async () => {
    // const result = await lampostAPI.patch(`/meetups/${selectedMeetup._id}`);
    setSelectedMeetup((previous) => {
      return {
        ...previous,
        state: 'ongoing',
      };
    });
  };
  // joinしたらmeetupのid使ってroomに入るようにするんだが、、、reloadしたらsocket切れるよな。切れたら、upcomingのmeetupid使って再度roomに入るようにする感じか。
  const renderApp = () => {
    // まず、authの確認。login状態なら、action buttonsをrenderする。
    if (auth.data) {
      // selectedMmeetupをlaunchした人が自分だった場合のmenu
      if (myUpcomingMeetupAndChatsTable[selectedMeetup._id]?.launcher === auth.data._id) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <ActionButton
              label='Start meetup now'
              icon={<Feather name='power' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => console.log('start meetup now', selectedMeetup._id)}
            /> */}
            <ActionButton
              label='Go to lounge'
              icon={<Ionicons name='ios-chatbubbles' size={25} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
            />
          </View>
        );
      } else {
        // それ以外。
        if (myUpcomingMeetupAndChatsTable[selectedMeetup._id]) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <ActionButton
                label='Leave this meetup'
                icon={<MaterialCommunityIcons name='exit-run' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['red1']}
                onActionButtonPress={() => leaveMeetup()}
              />
              <ActionButton
                label='Go to lounge'
                icon={<Ionicons name='ios-chatbubbles' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
              />
              <ActionButton
                label='Report this meetup'
                icon={<MaterialIcons name='report-problem' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() =>
                  navigation.navigate('Report meetup', { title: selectedMeetup.title, id: selectedMeetup._id })
                }
              />
            </View>
          );
        } else {
          return (
            <View>
              <ActionButton
                label='Join this meetup'
                icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => joinMeetup(selectedMeetup._id)}
              />
              <ActionButton
                label='Join this meetup'
                icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => joinMeetup(selectedMeetup._id)}
              />
            </View>
          );
        }
      }
    } else {
      // loginしていない場合はlogin or signupをさせるようにする。
      return <Text style={{ color: baseTextColor }}>It is required to login or signup to join the meetup.</Text>;
    }
    // for (let i = 0; i < auth.data.upcomingMeetups.length; i++) {
    //   // everyか？someかな。
    //   if (auth.data.upcomingMeetups[i].meetup === selectedMeetup._id) {
    //     return (
    //       <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
    //         {selectedMeetup.launcher._id === auth.data._id ? (
    //           <>
    //             {selectedMeetup.state === 'upcoming' ? (
    //               <ActionButton // ここ、meetupのstateによってbuttonを切り替える。
    //                 label='Start meetup now'
    //                 icon={<Feather name='power' size={20} color={'white'} />}
    //                 backgroundColor={iconColorsTable['blue1']}
    //                 onActionButtonPress={() => console.log('start meetup now', selectedMeetup._id)}
    //               />
    //             ) : (
    //               <ActionButton
    //                 label='Finish meetup'
    //                 icon={<Feather name='power' size={20} color={'white'} />}
    //                 backgroundColor={iconColorsTable['red1']}
    //                 onActionButtonPress={() => console.log('finish meetup now')}
    //               />
    //             )}
    //           </>
    //         ) : (
    //           <ActionButton
    //             label='Leave this meetup'
    //             icon={<MaterialCommunityIcons name='exit-run' size={25} color={'white'} />}
    //             backgroundColor={iconColorsTable['red1']}
    //             onActionButtonPress={() => leaveMeetup()}
    //           />
    //         )}
    //         <ActionButton
    //           label='Go to lounge'
    //           icon={<Ionicons name='ios-chatbubbles' size={25} color={'white'} />}
    //           backgroundColor={iconColorsTable['blue1']}
    //           onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
    //         />
    //       </View>
    //     );
    //   }
    // }
    // return (
    //   <View style={{}}>
    //     <ActionButton
    //       label='Join this meetup'
    //       icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={'white'} />}
    //       backgroundColor={iconColorsTable['blue1']}
    //       onActionButtonPress={() => joinMeetup(selectedMeetup._id)}
    //     />
    //   </View>
    // );
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 25 }}>
      {renderApp()}
    </ScrollView>
  );
};

export default ActionButtons;
