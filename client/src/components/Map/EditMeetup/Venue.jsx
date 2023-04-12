import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import EditMeetupContext from './EditMeetupContext';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import MapView, { Marker } from 'react-native-maps';
import { mapStyleForForm } from '../../../utils/mapStyle';

const Place = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, Fontisto } = iconsTable;
  const { accordion, setAccordion, editingData, setEditingData, navigation, route, meetup, setStageCleared } =
    useContext(EditMeetupContext);

  useEffect(() => {
    if (route.params?.editedVenue) {
      setEditingData((previous) => {
        return {
          ...previous,
          venue: {
            isEdited: true,
            data: route.params?.editedVenue,
          },
        };
      });

      setStageCleared((previous) => {
        return {
          ...previous,
          venue: true,
        };
      });
    }
  }, [route.params?.editedVenue]);
  // console.log(editingData);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                venue: !previous.venue,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['blue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='map' size={25} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Venue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} style={{ marginRight: 10 }} /> */}
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  venue: !previous.venue,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.venue ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.venue ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>Please change the location if you need to edit.</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={() => {
              if (editingData.venue.isEdited) {
                navigation.navigate('Select venue', {
                  editingPlace: editingData.venue.data,
                });
              } else {
                navigation.navigate('Select venue', { editingPlace: meetup.place });
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Fontisto name='map-marker-alt' size={20} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Change venue</Text>
            </View>
          </TouchableOpacity>
          <MapView
            style={{ width: '100%', height: 200 }}
            customMapStyle={mapStyleForForm}
            // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
            initialRegion={{
              latitude: meetup ? meetup.place.coordinates[1] : null,
              longitude: meetup ? meetup.place.coordinates[0] : null,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider='google'
            pitchEnabled={false}
          >
            {editingData.venue.isEdited ? null : (
              <Marker
                tracksViewChanges={false}
                coordinate={{
                  latitude: meetup ? meetup.place.coordinates[1] : null,
                  longitude: meetup ? meetup.place.coordinates[0] : null,
                }}
                // pinColor={editingData.venue.isEdited ? 'black' : 'red'}
              ></Marker>
            )}

            {editingData.venue.isEdited ? (
              <Marker
                tracksViewChanges={false}
                coordinate={{
                  latitude: editingData.venue.data.coordinates[1],
                  longitude: editingData.venue.data.coordinates[0],
                }}
              ></Marker>
            ) : null}
          </MapView>
        </View>
      ) : null}
    </View>
  );
};

export default Place;
