// main libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { Callout, Marker, Circle } from 'react-native-maps';

// ac
import { getPosts } from '../../../redux/actionCreators/posts';
import { selectPost } from '../../../redux/actionCreators/selectItem';

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

  // flatlistsなんで動かねーんだろ。
  const render = () => {
    if (props.posts.length) {
      console.log(props.posts);
      const li = props.posts.map((post) => {
        return (
          <View key={post._id}>
            <Marker
              coordinate={{ latitude: post.place.coordinates[1], longitude: post.place.coordinates[0] }}
              onPress={() => props.selectPost(post)}
            >
              <Callout>
                <Text>Yessssss</Text>
              </Callout>
            </Marker>
          </View>
        );
      });

      return <View>{li}</View>;
      // return (
      //   <FlatList
      //     data={props.posts}
      //     renderItem={({ item }) => (
      //       <Marker coordinate={{ latitude: item.place.coordinates[1], longitude: item.place.coordinates[0] }} />
      //     )}
      //     keyExtractor={(item) => item._id}
      //   />
      // );
    } else {
      return null;
    }
  };

  return (
    <>
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
        <Callout>
          <Text>Yessssss</Text>
        </Callout>
      </Marker>
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

export default connect(mapStateToProps, { getPosts, selectPost })(MapMarkers);
