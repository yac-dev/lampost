// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../../apis/lampost';
import { View, Text, FlatList, Image } from 'react-native';
import { Callout, Marker, Circle } from 'react-native-maps';
import { Avatar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// ac
import { getMeetups } from '../../../redux/actionCreators/meetups';
import { selectMeetup } from '../../../redux/actionCreators/selectItem';

import foodAndBeverage from '../../../../assets/badgeCollection/foodAndBeverage';

const Item = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const MapMarkers = (props) => {
  const [meetups, setMeetups] = useState([]);

  const getMeetups = async () => {
    const result = await lampostAPI.get('/meetups');
    const { meetups } = result.data;
    setMeetups((previous) => [...previous, ...meetups]);
  };

  useEffect(() => {
    // props.getMeetups();
    getMeetups();
  }, []);

  const renderItem = () => {
    return (
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
        <Callout>
          <Text>Yessssss</Text>
        </Callout>
      </Marker>
    );
  };

  // flatlistsなんで動かねーんだろ。
  const render = () => {
    if (meetups.length) {
      const meetupsList = meetups.map((meetup, index) => {
        return (
          <View key={index}>
            <Marker
              coordinate={{ latitude: meetup.place.coordinates[1], longitude: meetup.place.coordinates[0] }}
              // onPress={() => props.handleSelectedItemBottomSheetChanges(post)}
              pinColor='black'
              onPress={() => {
                // console.log('select item');
                // props.selectMeetup(meetup);
                props.handleSelectedItemBottomSheetChanges(meetup._id);
              }}
            >
              <View>
                <View style={{ backgroundColor: 'red', borderRadius: 5 }}>
                  <Image
                    source={foodAndBeverage[meetup.badges[0].label].source}
                    style={{ width: 30, height: 30, tintColor: meetup.badges[0].color }}
                  />
                </View>
                {/* <Text style={{ fontWeight: 'bold' }}>
                  {new Date(meetup.startDateAndTime).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                  })}
                </Text> */}
              </View>
              {/* <Button
                mode='contained'
                onPress={() => {
                  console.log('selected meetup');
                  props.selectMeetup(meetup);
                }}
              >
                {meetup.title}
              </Button> */}
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
  return { meetups: Object.values(state.meetups) };
};

export default connect(mapStateToProps, { getMeetups, selectMeetup })(MapMarkers);
