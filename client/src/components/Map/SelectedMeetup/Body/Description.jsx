// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Description = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ alignItems: 'center', marginRight: 30 }}>
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Description</Text>
        <MaterialCommunityIcons name={'file-document-edit'} size={20} />
      </View>
      <Text style={{ flex: 1, flexWrap: 'wrap', fontWeight: 'bold' }}>{props.selectedMeetup.description}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Description);
