import React, { useContext, useEffect } from 'react';
import lampostAPI from '../../apis/lampost';
import MapContext from './MeetupContext';
import { connect } from 'react-redux';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import MeetupMarker from './MeetupMarker';

import { getMeetups } from '../../redux/actionCreators/meetups';
import { selectMeetup } from '../../redux/actionCreators/selectItem';

const MapMarkers = (props) => {
  const { meetups, selectedMeetup, setSelectedMeetup, selectedMeetupBottomSheetRef } = useContext(MapContext);
  // useEffect(() => {
  //   const { socket } = props.auth;
  //   if (socket) {
  //     socket.on('SEND_NEW_MEETUP', (data) => {
  //       console.log(data.meetup);
  //       setMeetups((previous) => [...previous, data.meetup]);
  //     });
  //   }
  // }, [props.auth.socket]);

  // flatlistsなんで動かねーんだろ。

  const getSelectedMeetup = async (meetupId) => {
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
    selectedMeetupBottomSheetRef.current.snapToIndex(0);
  };

  // badgeだけ、また別で作った方がいいわ。
  const renderMeetups = () => {
    const meetupsArray = Object.values(meetups);
    if (meetupsArray.length) {
      const meetupsList = meetupsArray.map((meetup, index) => {
        // if (selectedMeetup && selectedMeetup._id === meetup._id) {
        //   return (
        //     <View key={index}>
        //       <Marker
        //         key={index}
        //         tracksViewChanges={false}
        //         coordinate={{ latitude: meetup.place.coordinates[1], longitude: meetup.place.coordinates[0] }}
        //         pinColor='black'
        //         onPress={() => {
        //           // props.handleSelectedItemBottomSheetChanges(meetup._id);
        //           // setSelectedMeetup()
        //           getSelectedMeetup(meetup._id);
        //         }}
        //       >
        //         <View
        //           style={{
        //             width: 55,
        //             aspectRatio: 1,
        //             backgroundColor: rnDefaultBackgroundColor,
        //             borderRadius: 10,
        //           }}
        //         >
        //           <TouchableOpacity
        //             style={{
        //               width: '100%',
        //               height: '100%',
        //               alignItems: 'center', // これと
        //               justifyContent: 'center', // これで中のimageを上下左右真ん中にする
        //               borderRadius: 10,
        //               backgroundColor: backgroundColorsTable[meetup.badge.color],
        //               borderColor: backgroundColorsTable[meetup.badge.color],
        //               borderWidth: 0.5,
        //             }}
        //           >
        //             <FastImage
        //               style={{ width: 30, height: 30 }}
        //               source={{
        //                 uri: meetup.badge.icon,
        //                 priority: FastImage.priority.normal,
        //               }}
        //               tintColor={iconColorsTable[meetup.badge.color]}
        //               resizeMode={FastImage.resizeMode.contain}
        //             />
        //           </TouchableOpacity>
        //         </View>
        //       </Marker>
        //     </View>
        //   );
        // } else {
        return <MeetupMarker key={index} meetup={meetup} />;
        // }
      });

      // まさか、ここが仇になるとはね。まあよかった。
      return <>{meetupsList}</>;
    } else {
      return null;
    }
  };

  return <>{renderMeetups()}</>;
};

export default connect(null, { getMeetups, selectMeetup })(MapMarkers);
