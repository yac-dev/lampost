// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 30 }}>
      <TouchableOpacity
        // mode={props.component === 'overview' ? 'contained' : 'outlined'}
        onPress={() => props.setComponent('about')}
        style={{
          borderBottomWidth: props.component === 'about' ? 2 : 0,
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          marginRight: 10,
        }}
        // style={{ backgroundColor: props.component === 'overview' ? 'red' : 'transparent', padding: 10 }}
      >
        <Text style={{ fontWeight: 'bold' }}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // mode={props.component === 'description' ? 'contained' : 'outlined'}
        onPress={() => props.setComponent('description')}
        style={{
          borderBottomWidth: props.component === 'description' ? 2 : 0,
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Description</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps, {})(Header);
