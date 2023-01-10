import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';

const MapMarker = (props) => {
  const [trackView, setTrackView] = useState(true);

  return (
    <Marker
      key={props.meetup._id}
      tracksViewChanges={trackView}
      coordinate={{ latitude: props.meetup.place.coordinates[1], longitude: props.meetup.place.coordinates[0] }}
      // pinColor='black'
      onPress={() => {
        getSelectedMeetup(props.meetup._id);
      }}
    >
      <View
        style={{
          width: 40,
          aspectRatio: 1,
          backgroundColor: rnDefaultBackgroundColor,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
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
          <FastImage
            onLoadEnd={() => setTrackView(false)}
            style={{ width: 30, height: 30 }}
            source={{
              uri: props.meetup.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.meetup.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </Marker>
  );
};

export default MapMarker;
