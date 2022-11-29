// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { iconColorsTable, backgroundColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// ac
import { getMeetups } from '../../redux/actionCreators/meetups';
import { selectMeetup } from '../../redux/actionCreators/selectItem';

const MapMarkers = (props) => {
  const [meetups, setMeetups] = useState([]);

  const getMeetups = async () => {
    const result = await lampostAPI.get('/meetups');
    const { meetups } = result.data;
    setMeetups((previous) => [...previous, ...meetups]);
  };

  useEffect(() => {
    getMeetups();
  }, []);

  useEffect(() => {
    const { socket } = props.auth;
    if (socket) {
      socket.on('SEND_NEW_MEETUP', (data) => {
        console.log(data.meetup);
        setMeetups((previous) => [...previous, data.meetup]);
      });
    }
  }, [props.auth.socket]);

  // flatlistsなんで動かねーんだろ。
  const render = () => {
    if (meetups.length) {
      const meetupsList = meetups.map((meetup, index) => {
        return (
          <View key={index}>
            <Marker
              key={index}
              tracksViewChanges={false}
              coordinate={{ latitude: meetup.place.coordinates[1], longitude: meetup.place.coordinates[0] }}
              // onPress={() => props.handleSelectedItemBottomSheetChanges(post)}
              pinColor='black'
              onPress={() => {
                // console.log('select item');
                // props.selectMeetup(meetup);
                props.handleSelectedItemBottomSheetChanges(meetup._id);
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
                    backgroundColor: backgroundColorsTable[meetup.badges[0].color],
                    borderColor: backgroundColorsTable[meetup.badges[0].color],
                    borderWidth: 0.5,
                  }}
                >
                  <FastImage
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: meetup.badges[0].icon,
                      priority: FastImage.priority.normal,
                    }}
                    tintColor={iconColorsTable[meetup.badges[0].color]}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>
            </Marker>
          </View>
        );
      });

      return <View>{meetupsList}</View>;
    } else {
      return null;
    }
  };

  return (
    <>
      {/* <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
        <Callout>
          <Text>Yessssss</Text>
        </Callout>
      </Marker> */}
      {/* <Circle center={{ latitude: 37.78825, longitude: -122.4324 }} radius={2000} /> */}
      {/* <FlatList
        data={props.posts}
        renderItem={({ item }) => (
          <Marker coordinate={{ latitude: item.place.coordinates[1], longitude: item.place.coordinates[0] }}>
            <Callout>
              <Text>Yessssss</Text>
            </Callout>
          </Marker>
        )}
        keyExtractor={(item) => item.id}
      /> */}
      {render()}
    </>
  );
};

const mapStateToProps = (state) => {
  return { meetups: Object.values(state.meetups), auth: state.auth };
};

export default connect(mapStateToProps, { getMeetups, selectMeetup })(MapMarkers);
