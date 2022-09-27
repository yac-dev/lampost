// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const Header = (props) => {
  // titleとuser情報の間に、meetupのbadgeが入ることになる。
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 25 }}>{props.selectedMeetup.title}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: 5, marginRight: 20 }}>
          <Text>Pic</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>{props.selectedMeetup.launcher.name}</Text>
          </TouchableOpacity>
          <Text>Skills here</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps, {})(Header);
