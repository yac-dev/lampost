import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../utils/colorsTable';

import { Foundation } from '@expo/vector-icons';

const AppButton = (props) => {
  return (
    <View
      style={{
        paddingTop: 10,
        width: 80,
        height: 120,
        alignItems: 'center',
        // backgroundColor: 'red',
      }}
    >
      <TouchableOpacity
        // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
        style={{
          width: 60,
          aspectRatio: 1,
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          borderRadius: 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: 10,
        }}
        onPress={() => {
          props.onAppMenuButtonPress();
        }}
        disabled={props.isDisabled}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: props.backgroundColor,
            borderWidth: 0.3,
            // borderColor: backgroundColorsTable[badge.color],
          }}
        >
          {props.icon}
        </View>
        {props.isDisabled ? (
          <Foundation name='prohibited' size={15} color={'red'} style={{ position: 'absolute', bottom: 0, right: 5 }} />
        ) : null}
      </TouchableOpacity>
      <Text
        style={{
          color: baseTextColor,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 12,
          textAlign: 'center',
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 4,
        }}
      >
        {props.label}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AppButton);
