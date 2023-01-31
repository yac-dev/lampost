import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { baseTextColor, baseBorderColor } from '../../../utils/colorsTable';

const Menu = (props) => {
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  return (
    // <TouchableOpacity
    //   style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
    //   onPress={() => props.menu.onPress()}
    // >
    //   <View
    //     style={{
    //       backgroundColor: props.menu.iconBackgroundColor,
    //       padding: 5,
    //       borderRadius: 7,
    //       width: 35,
    //       height: 35,
    //       alignItems: 'center',
    //     }}
    //   >
    //     {props.menu.icon}
    //   </View>
    //   <View
    //     style={{ marginLeft: 15, flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    //   >
    //     <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{props.menu.name}</Text>
    //     {props.menu.info}
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: 'red',
        // borderBottomColor: baseBorderColor,
        // borderBottomWidth: 0.3,
      }}
      onPress={() => props.onPressMenu()}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#EFEFEF',
            width: 35,
            height: 35,
            borderRadius: 7,
            marginRight: 15,
          }}
          // onPress={() => props.onPress()}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: props.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 7,
            }}
          >
            {props.icon}
          </View>
        </View>
        <Text style={{ color: baseTextColor, fontSize: 15 }}>{props.label}</Text>
      </View>
      {props.rightInfo}
    </TouchableOpacity>
  );
};

// childrenにするのかな。。。
export default Menu;
