// main libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { Callout, Marker, Circle } from 'react-native-maps';
import { Avatar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// ac
import { getPosts } from '../../../redux/actionCreators/posts';
import { selectPost } from '../../../redux/actionCreators/selectItem';
import { getMeetups } from '../../../redux/actionCreators/meetups';
import { selectMeetup } from '../../../redux/actionCreators/selectItem';

const Item = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const MapMarkers = (props) => {
  useEffect(() => {
    props.getMeetups();
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
    if (props.meetups.length) {
      const li = props.meetups.map((meetup) => {
        return (
          <View key={meetup._id}>
            <Marker
              coordinate={{ latitude: meetup.place.coordinates[1], longitude: meetup.place.coordinates[0] }}
              // onPress={() => props.handleSelectedItemBottomSheetChanges(post)}
              pinColor='black'
              onPress={() => {
                console.log('select item');
                props.selectMeetup(meetup);
              }}
            >
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

      return <View>{li}</View>;
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

export default connect(mapStateToProps, { getPosts, selectPost, getMeetups, selectMeetup })(MapMarkers);
