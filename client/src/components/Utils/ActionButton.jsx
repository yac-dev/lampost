import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable, screenSectionBackgroundColor } from '../../utils/colorsTable';

const ActionButton = (props) => {
  const { isIpad } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: isIpad ? 5 : 2,
        paddingBottom: isIpad ? 5 : 2,
        paddingRight: isIpad ? 20 : 10,
        paddingLeft: isIpad ? 10 : 5,
        backgroundColor: props.isDisabled ? screenSectionBackgroundColor : props.backgroundColor,
        marginRight: isIpad ? 20 : 10,
        borderRadius: isIpad ? 20 : 10,
      }}
      onPress={() => props.onActionButtonPress()}
      disabled={props.isDisabled}
    >
      <View
        style={{
          width: isIpad ? 80 : 40,
          height: isIpad ? 80 : 40,
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
        }}
      >
        {props.icon}
      </View>
      <Text style={{ color: 'white', fontSize: isIpad ? 25 : 15 }}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
