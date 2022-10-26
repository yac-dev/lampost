import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Menu = (props) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
      onPress={() => props.menu.onPress()}
    >
      <View
        style={{
          backgroundColor: props.menu.iconBackgroundColor,
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        {props.menu.icon}
      </View>
      <View
        style={{ marginLeft: 15, flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{props.menu.name}</Text>
        {props.menu.info}
        {/* <Text style={{ fontSize: 13, color: '#9E9E9E' }}>40</Text> */}
      </View>
    </TouchableOpacity>
  );
};

// childrenにするのかな。。。
export default Menu;
