// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const Tab = (props) => {
  return (
    <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 30 }}>
      <TouchableOpacity
        style={{ padding: 10, marginRight: 10, borderBottomWidth: props.component === 'about' ? 1 : '' }}
        onPress={() => props.setComponent('about')}
      >
        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, marginRight: 10, borderBottomWidth: props.component === 'locationDetail' ? 1 : '' }}
        onPress={() => props.setComponent('locationDetail')}
      >
        <Text>Location Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, borderBottomWidth: props.component === 'qAndA' ? 1 : '' }}
        onPress={() => props.setComponent('qAndA')}
      >
        <Text>Q&A ({props.selectedMeetup.comments.length})</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Tab);