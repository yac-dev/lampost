import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';

import Menu from './Menu';

const Menus = (props) => {
  const { auth, setIsPleaseLoginModalOpen, isIpad } = useContext(GlobalContext);
  const {
    selectedMeetup,
    navigation,
    selectedMeetupDetailComponent,
    setSelectedMeetupDetailComponent,
    selectedMeetupDetailBottomSheetRef,
  } = useContext(MapContext);

  // const menuOptions = [
  //   {
  //     name: 'Launcher',
  //     iconBackgroundColor: iconColorsTable['red1'],
  //     icon: <MaterialCommunityIcons name='rocket-launch' size={25} color={'white'} />,
  //     info: (
  //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //         <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
  //         <Text>{`${props.selectedMeetup.launcher.name} >`}</Text>
  //       </View>
  //     ),
  //     onPress: () => {
  //       props.navigation.navigate('User', { userId: props.selectedMeetup.launcher._id });
  //     },
  //   },
  //   {
  //     name: 'Preferred Badges',
  //     iconBackgroundColor: iconColorsTable['lightGreen1'],
  //     icon: <Foundation name='sheriff-badge' size={25} color='white' />,
  //     info: (
  //       <Text>{`${props.selectedMeetup.launcher.name} >`}</Text>
  //       // <View style={{ flexDirection: 'row' }}>
  //       //   {props.selectedMeetup.badges.map((badge, index) => {
  //       //     return (
  //       //       <FastImage
  //       //         style={{ height: 35, width: 35 }}
  //       //         source={{
  //       //           uri: props.selectedMeetup.badge.icon,
  //       //           // headers: { Authorization: 'someAuthToken' },
  //       //           priority: FastImage.priority.normal,
  //       //         }}
  //       //         tintColor={iconColorsTable[props.selectedMeetup.badge.color]}
  //       //         resizeMode={FastImage.resizeMode.contain}
  //       //       />
  //       //     );
  //       //   })}
  //       // </View>
  //     ),
  //     onPress: () => {
  //       props.handleselectedMeetupDetailBottomSheetChanges('Badges');
  //     },
  //   },
  //   {
  //     name: 'Crew',
  //     iconBackgroundColor: iconColorsTable['violet1'],
  //     icon: <FontAwesome5 name='user-astronaut' size={25} color='white' />,
  //     info: <Text>{`${props.selectedMeetup.attendees.length} >`}</Text>,
  //     onPress: () => {
  //       props.handleselectedMeetupDetailBottomSheetChanges('Crew');
  //     },
  //   },
  //   {
  //     name: 'Q&As',
  //     iconBackgroundColor: iconColorsTable['pink1'],
  //     icon: <MaterialCommunityIcons name='chat-question' size={25} color='white' />,
  //     info: <Text>{`${props.selectedMeetup.comments.length} >`}</Text>,
  //     onPress: () => {
  //       props.handleselectedMeetupDetailBottomSheetChanges('QandAs');
  //     },
  //   },
  //   {
  //     name: 'Fee',
  //     // 254, 208, 0  // 236, 164, 20
  //     iconBackgroundColor: iconColorsTable['yellow1'],
  //     icon: <Foundation name='dollar-bill' size={25} color='white' />,
  //     info: <View>{props.selectedMeetup.isFeeFree ? <Text>Its free</Text> : <Text>Its not free</Text>}</View>,
  //     onPress: () => {
  //       props.handleselectedMeetupDetailBottomSheetChanges('Fee');
  //     },
  //   },
  //   {
  //     name: 'MediaPermission',
  //     iconBackgroundColor: iconColorsTable['lightBlue1'],
  //     icon: <FontAwesome5 name='photo-video' size={25} color='white' />,
  //     info: <View>{props.selectedMeetup.isMediaAllowed ? <Text>Allowed</Text> : <Text>Not allowed...</Text>}</View>,
  //     onPress: () => {
  //       // props.handleselectedMeetupDetailBottomSheetChanges('MediaPermission');
  //       props.handleselectedMeetupDetailBottomSheetChanges('MediaPermission');
  //     },
  //   },
  //   {
  //     name: 'Link',
  //     iconBackgroundColor: iconColorsTable['grey1'],
  //     icon: <Entypo name='link' size={25} color='white' />,
  //     info: <Text>right</Text>,
  //     onPress: () => {
  //       props.handleselectedMeetupDetailBottomSheetChanges('Links');
  //     },
  //   },
  // ];

  // const renderMenus = () => {
  //   const menusList = menuOptions.map((menu, index) => {
  //     return <Menu key={index} menu={menu} />;
  //   });

  //   return <View>{menusList}</View>;
  // };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, color: baseTextColor, marginRight: 10 }}>
          {dateElements[0]}&nbsp;{dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderTime = (date, duration) => {
    const baseTime = new Date(date);
    const startTime = baseTime.toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    const startDateElements = startTime.split(', ');
    var endTime = new Date(baseTime);
    endTime.setMinutes(baseTime.getMinutes() + duration);
    endTime = endTime.toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    const endDateElements = endTime.split(', ');

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: baseTextColor, fontSize: 15 }}>
          {startDateElements[1]}&nbsp;~&nbsp;{endDateElements[1]}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      // contentContainerStyle={{ paddingBottom: 50 }}
      style={{ borderRadius: 10, backgroundColor: sectionBackgroundColor }}
    >
      <Menu
        label='Launcher'
        icon={<MaterialCommunityIcons name='rocket-launch' size={20} color={iconColorsTable['red1']} />}
        backgroundColor={backgroundColorsTable['red1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {selectedMeetup.launcher.fame ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <MaterialCommunityIcons name='torch' size={20} color='red' />
                <Text style={{ color: baseTextColor }}>{selectedMeetup.launcher.fame}</Text>
              </View>
            ) : null}
            <View style={{ width: 80 }}>
              <Text numberOfLines={1} style={{ color: baseTextColor, fontSize: 15 }}>
                {selectedMeetup.launcher.name}
              </Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          // if (!auth.data) {
          //   setIsPleaseLoginModalOpen(true);
          // } else {
          // Map tab内では、自分のpageを見せないようにする。ごちゃごちゃになってめんどいからね。
          if (!auth.data || auth.data._id !== selectedMeetup.launcher._id) {
            navigation.navigate('User', { userId: selectedMeetup.launcher._id });
          }
          // }
        }}
      />
      <Menu
        label='Date'
        backgroundColor={backgroundColorsTable['blue1']}
        icon={<MaterialCommunityIcons name='calendar-clock' size={20} color={iconColorsTable['blue1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                alignSelf: 'flex-start',
              }}
            >
              {renderDate(selectedMeetup.startDateAndTime)}
              {renderTime(selectedMeetup.startDateAndTime, selectedMeetup.duration)}
            </View>
            {/* <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} /> */}
          </View>
        }
        onPressMenu={() => {
          // navigation.navigate('Description', { description: selectedMeetup.description });
          setSelectedMeetupDetailComponent('Description');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Fee'
        icon={<Foundation name='dollar-bill' size={20} color={iconColorsTable['yellow1']} />}
        backgroundColor={backgroundColorsTable['yellow1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontSize: 15 }}>
              {selectedMeetup.isFeeFree ? "It's free" : "It's not free"}
            </Text>
            {/* <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} /> */}
          </View>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('Fee');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Description'
        backgroundColor={backgroundColorsTable['green1']}
        icon={<MaterialCommunityIcons name='card-text-outline' size={20} color={iconColorsTable['green1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <View style={{ width: 80 }}>
              <Text numberOfLines={1} style={{ color: baseTextColor, fontSize: 15 }}>
                {selectedMeetup.description}
              </Text>
            </View> */}
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          // navigation.navigate('Description', { description: selectedMeetup.description });
          setSelectedMeetupDetailComponent('Description');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Members'
        icon={<MaterialIcons name='groups' size={20} color={iconColorsTable['violet1']} />}
        backgroundColor={backgroundColorsTable['violet1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          // setSelectedMeetupDetailComponent('Crew');
          // selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
          navigation.navigate('Attendees', { meetupId: selectedMeetup._id });
        }}
      />
      {/* <Menu
        label='Q&As'
        icon={<MaterialCommunityIcons name='chat-question' size={20} color={iconColorsTable['blue1']} />}
        backgroundColor={backgroundColorsTable['blue1']}
        rightInfo={<MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />}
        onPressMenu={() => {
          navigation.navigate('QandAs', {
            meetup: {
              _id: selectedMeetup._id,
              launcher: selectedMeetup.launcher._id,
            },
          });
        }}
      /> */}
    </ScrollView>
  );
};

export default Menus;
