// main libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { Callout, Marker, Circle } from 'react-native-maps';

// ac
import { getPosts } from '../../../redux/actionCreators/posts';

const Item = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const MapMarkers = (props) => {
  useEffect(() => {
    props.getPosts();
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

  const render = () => {
    if (props.posts.length) {
      return (
        <FlatList
          data={props.posts}
          renderItem={({ item }) => (
            <Marker coordinate={{ latitude: item.place.coordinates[1], longitude: item.place.coordinates[0] }}>
              <Callout>
                <Text>Yessssss</Text>
              </Callout>
            </Marker>
          )}
          keyExtractor={(item) => item._id}
        />
      );
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
  return { posts: Object.values(state.posts) };
};

export default connect(mapStateToProps, { getPosts })(MapMarkers);
