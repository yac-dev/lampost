import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import SVG from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../apis/lampost';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const MapMarker = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { selectedMeetup, setSelectedMeetup, meetupDetailBottomSheetRef, setViewing } = useContext(MapContext);
  // const [trackView, setTrackView] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [showCallout, setShowCallout] = useState(false);

  const getSelectedMeetup = async (meetupId) => {
    meetupDetailBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
    setShowCallout(true);
    // setViewing(meetup.place.coordinates);
  };

  return (
    <Marker
      key={`${props.meetup._id}-${initialRender}`}
      tracksViewChanges={false}
      coordinate={{ latitude: props.meetup.place.coordinates[1], longitude: props.meetup.place.coordinates[0] }}
      pinColor='black'
      onPress={() => {
        getSelectedMeetup(props.meetup._id);
      }}
    >
      <View
        style={{
          width: 45,
          aspectRatio: 1,
          backgroundColor: rnDefaultBackgroundColor,
          borderRadius: 10,
          // marginRight: 5,
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 10,
            backgroundColor: backgroundColorsTable[props.meetup.badge.color],
            borderColor: backgroundColorsTable[props.meetup.badge.color],
            borderWidth: 0.5,
          }}
        >
          <SVG width={35} height={35}>
            <FastImage
              onLoad={() => setInitialRender(false)}
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: props.meetup.badge.icon.url,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[props.meetup.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </SVG>
        </View>
        {selectedMeetup && selectedMeetup._id === props.meetup._id ? (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: 'red',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          ></View>
        ) : null}
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <FastImage
            source={{ uri: props.meetup.launcher.photo ? props.meetup.launcher.photo : '' }}
            style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: iconColorsTable['blue1'] }}
            tintColor={props.meetup.launcher.photo ? null : 'white'}
          />
        </View>
      </View>
    </Marker>
  );
};

export default MapMarker;
