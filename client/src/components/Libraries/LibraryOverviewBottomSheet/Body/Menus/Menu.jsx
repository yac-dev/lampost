import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable, backgroundColorsTable } from '../../../../../utils/colorsTable';

const Menu = (props) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
      onPress={() => props.onPress()}
    >
      <View
        style={{
          backgroundColor: props.iconBackgroundColor,
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        {props.iconComponent}
      </View>
      <View
        style={{ marginLeft: 15, flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{props.label}</Text>
        {props.rightInfoComponent}
      </View>
    </TouchableOpacity>
  );
};

export default Menu;
