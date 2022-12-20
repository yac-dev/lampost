import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';

const Description = () => {
  const { selectedMeetup, selectedMeetupDetailComponent, navigation } = useContext(MapContext);

  return (
    <View>
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Description</Text>
        <Text style={{ color: baseTextColor }}>{selectedMeetup.description}</Text>
      </View>
    </View>
  );
};

export default Description;
