// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// icon
import { AntDesign } from '@expo/vector-icons';

// ac
import { removeBadge } from '../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderColor: 'rgba(148, 148, 148, 0.85)',
        borderWidth: 1,
        padding: 10,
        marginLeft: 5,
        marginTop: 5,
      }}
      onPress={() => {
        console.log('hello');
      }}
    >
      <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: props.badge.color }} />
      <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => {
          props.removeBadge(props.badge);
        }}
      >
        <AntDesign name='close' size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default connect(null, { removeBadge })(Badge);
