import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../utils/colorsTable';

import Menu from './Menu';

const Menus = (props) => {
  const { auth } = useContext(GlobalContext);
  const {
    selectedMeetup,
    navigation,
    selectedMeetupDetailComponent,
    setSelectedMeetupDetailComponent,
    selectedMeetupDetailBottomSheetRef,
  } = useContext(MapContext);

  const renderDate = (date) => {
    if (date) {
      return (
        <Text>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</Text>
      );
    } else {
      return null;
    }
  };

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

  return (
    <View style={{ padding: 5, borderRadius: 10, backgroundColor: sectionBackgroundColor }}>
      <Menu
        label='Launcher'
        icon={<MaterialCommunityIcons name='rocket-launch' size={25} color={iconColorsTable['red1']} />}
        backgroundColor={backgroundColorsTable['red1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {selectedMeetup.launcher.photo ? (
                <Image
                  source={{ uri: selectedMeetup.launcher.photo }}
                  style={{ width: 35, height: 35, borderRadius: 10, marginRight: 10 }}
                />
              ) : (
                <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
              )}
              <Text style={{ color: baseTextColor }}>{selectedMeetup.launcher.name}</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          // Map tab?????????????????????page???????????????????????????????????????????????????????????????????????????????????????
          if (!auth.data || auth.data._id !== selectedMeetup.launcher._id) {
            navigation.navigate('User', { userId: selectedMeetup.launcher._id });
          }
        }}
      />
      <Menu
        label='Description'
        onPress={() => console.log('hello')}
        backgroundColor={backgroundColorsTable['green1']}
        icon={<MaterialCommunityIcons name='card-text-outline' size={25} color={iconColorsTable['green1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ color: baseTextColor, width: 100 }}>
              {selectedMeetup.description}
            </Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('Description');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Crew'
        icon={<FontAwesome5 name='user-astronaut' size={25} color={iconColorsTable['violet1']} />}
        backgroundColor={backgroundColorsTable['violet1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{selectedMeetup.totalAttendees}</Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('Crew');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Comments'
        icon={<MaterialCommunityIcons name='chat-question' size={25} color={iconColorsTable['blue1']} />}
        backgroundColor={backgroundColorsTable['blue1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{selectedMeetup.comments.length}</Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('QandAs');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      <Menu
        label='Fee'
        icon={<Foundation name='dollar-bill' size={25} color={iconColorsTable['yellow1']} />}
        backgroundColor={backgroundColorsTable['yellow1']}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{selectedMeetup.isFeeFree ? "It's free" : "It's not free"}</Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('Fee');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
      {/* <Menu
        label='Privacy'
        icon={<FontAwesome5 name='photo-video' size={25} color={iconColorsTable['lightBlue1']} />}
        backgroundColor={backgroundColorsTable['lightBlue1']}
        rightInfo={
          <Text style={{ color: baseTextColor }}>{selectedMeetup.isMediaAllowed ? 'Allowed' : 'Not allowed'}</Text>
        }
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('MediaPermission');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      /> */}
      <Menu
        label='Link'
        icon={<Entypo name='link' size={25} color={iconColorsTable['grey1']} />}
        backgroundColor={backgroundColorsTable['grey1']}
        rightInfo={<MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />}
        onPressMenu={() => {
          setSelectedMeetupDetailComponent('Links');
          selectedMeetupDetailBottomSheetRef.current.snapToIndex(0);
        }}
      />
    </View>
  );
};

export default Menus;
