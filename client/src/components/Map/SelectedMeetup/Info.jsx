import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';

const Launcher = (props) => {
  return (
    <View style={{ padding: 10, backgroundColor: screenSectionBackgroundColor }}>
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 7,
          backgroundColor: 'red',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>{props.icon}</View>
          <Text>{props.label}</Text>
        </View>
        {props.subInfo}
      </TouchableOpacity>
      {isAccordionOpen ? <View></View> : null}
    </View>
  );
};

export default Launcher;
