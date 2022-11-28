// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
  baseTextColor,
} from '../../../../../../utils/colorsTable';

// icon
import { AntDesign } from '@expo/vector-icons';

// ac
import { removeBadge } from '../../../../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  return (
    // <View
    //   style={{
    //     alignItems: 'center',
    //     borderRadius: 7,
    //     // backgroundColor,
    //     borderStyle: 'solid',
    //     borderColor: '#D7D7D7',
    //     borderWidth: 1,
    //     padding: 15,
    //     // marginLeft: 5,
    //     marginRight: 15,
    //     marginBottom: 15,
    //     maxWidth: 150,
    //     height: 100,
    //   }}
    // >
    //   <FastImage
    //     style={{ height: 40, width: props.badge.landscape ? 65 : 40, marginBottom: 5 }}
    //     source={{
    //       uri: props.badge.icon,
    //       // headers: { Authorization: 'someAuthToken' },
    //       priority: FastImage.priority.normal,
    //     }}
    //     tintColor={props.badge.color}
    //     resizeMode={FastImage.resizeMode.contain}
    //   />
    //   <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.badge.name}</Text>
    //   <TouchableOpacity
    //     style={{
    //       top: 0,
    //       right: 0,
    //       position: 'absolute',
    //       color: '#989898',
    //     }}
    //     onPress={() => props.removeBadge(props.badge)}
    //   >
    //     <AntDesign name='closecircleo' size={20} />
    //   </TouchableOpacity>
    // </View>

    // <View
    //   style={{
    //     width: 80,
    //     aspectRatio: 1,
    //     padding: 10,
    //     marginBottom: 20,
    //     // backgroundColor: rnDefaultBackgroundColor,
    //   }}
    // >
    //   <TouchableOpacity
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       alignItems: 'center', // これと
    //       justifyContent: 'center', // これで中のimageを上下左右真ん中にする
    //       borderRadius: 10,
    //       backgroundColor: backgroundColorsTable[props.badge.color],
    //       borderStyle: 'solid',
    //       borderColor: backgroundColorsTable[props.badge.color],
    //       borderWidth: 1,
    //       // backgroundColor: 'red',
    //       marginBottom: 5,
    //     }}
    //   >
    //     <FastImage
    //       style={{ width: 50, height: 50 }}
    //       source={{
    //         uri: props.badge.icon,
    //         priority: FastImage.priority.normal,
    //       }}
    //       tintColor={iconColorsTable[props.badge.color]}
    //       resizeMode={FastImage.resizeMode.contain}
    //     />
    //   </TouchableOpacity>
    //   <Text
    //     style={{
    //       fontWeight: 'bold',
    //       alignSelf: 'center',
    //       fontSize: 10,
    //       textAlign: 'center',
    //       color: baseTextColor,
    //     }}
    //   >
    //     {props.badge.name}
    //   </Text>
    // </View>
    <View style={{ padding: 10 }}>
      <View
        style={{
          backgroundColor: rnDefaultBackgroundColor,
          width: 65,
          height: 65,
          marginRight: 10,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 10,
            backgroundColor: backgroundColorsTable[props.badge.color],
            borderColor: backgroundColorsTable[props.badge.color],
            borderWidth: 0.3,
            marginBottom: 5,
          }}
        >
          <FastImage
            style={{ width: 45, height: 45 }}
            source={{
              uri: props.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 10,
          textAlign: 'center',
          color: baseTextColor,
        }}
      >
        {props.badge.name}
      </Text>
    </View>
  );
};

export default connect(null, { removeBadge })(Badge);
