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
import { Fontisto } from '@expo/vector-icons';
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
import { iconsTable } from '../../../utils/icons';

const Menus = (props) => {
  const { auth, setIsPleaseLoginModalOpen, isIpad } = useContext(GlobalContext);
  const {
    selectedMeetup,
    navigation,
    selectedMeetupDetailComponent,
    setSelectedMeetupDetailComponent,
    selectedMeetupDetailBottomSheetRef,
  } = useContext(MapContext);

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
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          navigation.navigate('Meetup date', {
            launcherId: selectedMeetup.launcher._id,
            meetupId: selectedMeetup._id,
            date: selectedMeetup.startDateAndTime,
            duration: selectedMeetup.duration,
            agenda: selectedMeetup.agenda,
          });
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
          navigation.navigate('Meetup description', {
            launcherId: selectedMeetup.launcher._id,
            meetupId: selectedMeetup._id,
            description: selectedMeetup.description,
          });
          // setSelectedMeetupDetailComponent('Description');
          // selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Fee'
        icon={<Foundation name='dollar-bill' size={20} color={iconColorsTable['yellow1']} />}
        backgroundColor={backgroundColorsTable['yellow1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontSize: 15 }}>
              {selectedMeetup.isFeeFree ? "It's free" : `$${selectedMeetup.fee}`}
            </Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          navigation.navigate('Meetup fee', {
            launcherId: selectedMeetup.launcher._id,
            meetupId: selectedMeetup._id,
            isFeeFree: selectedMeetup.isFeeFree,
            fee: selectedMeetup.fee,
          });
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
      <Menu
        label='Meetup point'
        icon={<Fontisto name='map-marker-alt' size={20} color={iconColorsTable['pink1']} />}
        backgroundColor={backgroundColorsTable['pink1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          // setSelectedMeetupDetailComponent('Crew');
          // selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
          navigation.navigate('Meetup point', {
            launcherId: selectedMeetup.launcher._id,
            meetupId: selectedMeetup._id,
            meetupPoint: selectedMeetup.meetupPoint,
          });
        }}
      />
      {selectedMeetup.link ? (
        <Menu
          label='Link'
          icon={<MaterialCommunityIcons name='link' size={20} color={iconColorsTable['grey1']} />}
          backgroundColor={backgroundColorsTable['grey1']}
          rightInfo={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
            </View>
          }
          onPressMenu={() => {
            navigation.navigate('Meetup link', {
              launcherId: selectedMeetup.launcher._id,
              meetupId: selectedMeetup._id,
              link: selectedMeetup.link,
            });
          }}
        />
      ) : null}
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
