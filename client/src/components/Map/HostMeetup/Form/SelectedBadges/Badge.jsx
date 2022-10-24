// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

// icon
import { AntDesign } from '@expo/vector-icons';

// ac
import { removeBadge } from '../../../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  return (
    // <View
    //   style={{
    //     flexDirection: 'row',
    //     alignSelf: 'flex-start',
    //     alignItems: 'center',
    //     borderRadius: 20,
    //     backgroundColor: 'white',
    //     borderStyle: 'solid',
    //     borderColor: 'rgba(148, 148, 148, 0.85)',
    //     borderWidth: 1,
    //     padding: 10,
    //     marginLeft: 5,
    //     marginTop: 5,
    //   }}
    //   onPress={() => {
    //     console.log('hello');
    //   }}
    // >
    //   <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: props.badge.color }} />
    //   <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
    //   <TouchableOpacity
    //     style={{ marginLeft: 10 }}
    //     onPress={() => {
    //       props.removeBadge(props.badge);
    //     }}
    //   >
    //     <AntDesign name='close' size={24} />
    //   </TouchableOpacity>
    // </View>
    <View
      style={{
        // flexDirection: 'row',
        // alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 7,
        // backgroundColor,
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        padding: 15,
        // marginLeft: 5,
        marginRight: 15,
        marginBottom: 15,
        maxWidth: 150,
        height: 100,
        // marginTop: 5,
      }}
      onPress={() => {
        // onPressBadge();
        // selectBadge();
        // props.setIsTappedBadgeBottomSheetOpen(true, props.badge);
      }}
    >
      {/* <View style={{ backgroundColor: '#B0AFAF' }}> */}
      <FastImage
        style={{ height: 40, width: props.badge.landscape ? 65 : 40, marginBottom: 5 }}
        source={{
          uri: props.badge.icon,
          // headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        tintColor={props.badge.color}
        resizeMode={FastImage.resizeMode.contain}
      />
      {/* </View> */}
      <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.badge.name}</Text>
      <TouchableOpacity
        style={{
          // borderRadius: 10,
          // borderColor: '#D7D7D7',
          // borderWidth: 1,
          // padding: 2,
          top: 0,
          right: 0,
          position: 'absolute',
          color: '#989898',
          // backgroundColor: '#D7D7D7',
        }}
        onPress={() => props.removeBadge(props.badge)}
      >
        <AntDesign name='closecircleo' size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default connect(null, { removeBadge })(Badge);
