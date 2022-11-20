// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const Header = (props) => {
  // const renderActionButton = () => {
  //   if (props.auth.isAuthenticated) {
  //     for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
  //       if (props.auth.data.upcomingMeetups[i].meetup === props.selectedMeetup._id) {
  //         if (props.auth.data.upcomingMeetups[i].launched) {
  //           return (
  //             <View style={{ flex: 3 }}>
  //               <Button
  //                 mode='outlined'
  //                 icon={'application-edit-outline'}
  //                 onPress={() => console.log('edit')}
  //                 style={{ marginBottom: 10 }}
  //               >
  //                 Edit
  //               </Button>
  //               <Button mode='outlined' icon={'plus'} onPress={() => console.log('edit')}>
  //                 Scout
  //               </Button>
  //             </View>
  //           );
  //         } else {
  //           return (
  //             <View style={{ flex: 3 }}>
  //               <Button
  //                 mode='outlined'
  //                 icon={'plus'}
  //                 onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
  //                 style={{ marginBottom: 10 }}
  //               >
  //                 Leave
  //               </Button>
  //             </View>
  //           );
  //         }
  //       }
  //     }
  //     // upcomingMeetupsが全くない場合、ただjoinするかを聞くだけ。
  //     return (
  //       <View style={{ flex: 3 }}>
  //         <Button
  //           mode='outlined'
  //           icon={'plus'}
  //           onPress={() => props.joinMeetup(props.selectedMeetup._id)}
  //           style={{ alignItems: 'center' }}
  //         >
  //           I'm in!
  //         </Button>
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const renderDate = (date) => {
  //   return (
  //     <Text>{`${new Date(date).toLocaleString('en-US', {
  //       weekday: 'long',
  //       month: 'long',
  //       day: 'numeric',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     })}`}</Text>
  //   );
  // }; 何で、ここだとこれ動かないんだろ。。。。

  const ren = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(d);
    return <Text>Scheduled for&nbsp;&nbsp;{d}</Text>;
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage
          style={{ height: 35, width: 35, marginRight: 5 }}
          source={{
            uri: props.selectedMeetup.badge.icon,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          tintColor={iconColorsTable[props.selectedMeetup.badge.color]}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{props.selectedMeetup.title}</Text>
      </View>
      <Text style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
        {/* {`Starts at ${renderDate(props.selectedMeetup.startDateAndTime)}`} */}
        {ren(props.selectedMeetup.startDateAndTime)}
      </Text>
      <Text style={{ flexShrink: 1 }}>{props.selectedMeetup.description}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(Header);
