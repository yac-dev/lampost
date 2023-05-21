import React, { useContext, useState } from 'react';
import MapContext from './MeetupContext';
import { View } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import { Marker } from 'react-native-maps';
import SVG from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const MapMarkers = () => {
  const { meetups, selectedMeetup, setSelectedMeetup, meetupDetailBottomSheetRef, setViewing } = useContext(MapContext);
  const [initialRender, setInitialRender] = useState(true);

  const getSelectedMeetup = async (meetupId) => {
    meetupDetailBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
  };

  const renderMeetups = () => {
    const meetupsArray = Object.values(meetups);
    if (meetupsArray.length) {
      const meetupsList = meetupsArray.map((meetup, index) => {
        if (meetup.launcher) {
          return (
            <Marker
              key={`${index}-${initialRender}`}
              tracksViewChanges={false}
              coordinate={{ latitude: meetup.place.coordinates[1], longitude: meetup.place.coordinates[0] }}
              pinColor='black'
              onPress={() => {
                getSelectedMeetup(meetup._id);
              }}
            >
              <View
                style={{
                  width: 45,
                  aspectRatio: 1,
                  backgroundColor: rnDefaultBackgroundColor,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center', // これと
                    justifyContent: 'center', // これで中のimageを上下左右真ん中にする
                    borderRadius: 10,
                    backgroundColor: backgroundColorsTable[meetup.badge.color],
                    borderColor: backgroundColorsTable[meetup.badge.color],
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
                        uri: meetup.badge.icon.url,
                        priority: FastImage.priority.normal,
                      }}
                      tintColor={iconColorsTable[meetup.badge.color]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </SVG>
                </View>
                {selectedMeetup && selectedMeetup._id === meetup._id ? (
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
                    source={{ uri: meetup.launcher.photo ? meetup.launcher.photo : '' }}
                    style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: iconColorsTable['blue1'] }}
                    tintColor={meetup.launcher.photo ? null : 'white'}
                  />
                </View>
              </View>
            </Marker>
          );
        } else {
          return null;
        }
      });
      return <>{meetupsList}</>;
    } else {
      return null;
    }
  };

  return <>{renderMeetups()}</>;
};

export default MapMarkers;
