import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import LogContext from './LogContext';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../utils/colorsTable';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const ActionButtons = (props) => {
  const { pastMeetup, isMyPage, handleCreateRollBottomSheet, handleAddCommentBottomSheet } = useContext(LogContext);

  if (pastMeetup.launcher._id === props.auth.data._id) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}
          onPress={() => console.log('Add message')}
        >
          <FontAwesome name='comment' size={25} color={baseTextColor} style={{ marginRight: 5 }} />
          <Text style={{ color: baseTextColor }}>Add your thought</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
          <MaterialCommunityIcons name='human-greeting-variant' size={25} color={'black'} style={{ marginRight: 5 }} />
          <Text style={{}}>Connect</Text>
        </TouchableOpacity> */}
      </View>
    );
  } else {
    if (isMyPage) {
      return (
        <View>
          <Text>Action butons of me</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Action butons of others</Text>
        </View>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ActionButtons);
