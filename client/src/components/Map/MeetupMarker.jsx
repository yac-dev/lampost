import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import SVG from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../apis/lampost';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MapMarker = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { selectedMeetup, setSelectedMeetup, selectedMeetupBottomSheetRef } = useContext(MapContext);
  // const [trackView, setTrackView] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  const getSelectedMeetup = async (meetupId) => {
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
    selectedMeetupBottomSheetRef.current.snapToIndex(0);
  };

  return (
    <Marker
      key={`${props.meetup._id}-${initialRender}`}
      tracksViewChanges={false}
      coordinate={{ latitude: props.meetup.place.coordinates[1], longitude: props.meetup.place.coordinates[0] }}
      // pinColor='black'
      onPress={() => {
        getSelectedMeetup(props.meetup._id);
      }}
    >
      <View
        style={{
          width: isIpad ? 80 : 40,
          aspectRatio: 1,
          backgroundColor: rnDefaultBackgroundColor,
          borderRadius: isIpad ? 20 : 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: isIpad ? 20 : 10,
            backgroundColor: backgroundColorsTable[props.meetup.badge.color],
            borderColor: backgroundColorsTable[props.meetup.badge.color],
            borderWidth: 0.5,
          }}
        >
          <SVG width={isIpad ? 60 : 30} height={isIpad ? 60 : 30}>
            {/* <Image href={{ uri: props.meetup.badge.icon }} width={'100%'} height={'100%'} /> */}
            <FastImage
              // onLoadEnd={() => setTrackView(false)}
              onLoad={() => setInitialRender(false)}
              // onLayout={() => setInitialRender(false)}
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: props.meetup.badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[props.meetup.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </SVG>
        </TouchableOpacity>
      </View>
    </Marker>
  );
};

export default MapMarker;
