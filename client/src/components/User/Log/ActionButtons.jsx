import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import LogContext from './LogContext';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const ActionButtons = (props) => {
  const { meetup, isMyPage, handleCreateRollBottomSheet, handleAddCommentBottomSheet } = useContext(LogContext);

  if (meetup.launcher === props.auth.data._id) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}
          onPress={() => handleCreateRollBottomSheet()}
        >
          <MaterialIcons name='photo-album' size={25} color={'black'} style={{ marginRight: 5 }} />
          <Text style={{ fontWeight: 'bold' }}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}
          onPress={() => handleAddCommentBottomSheet()}
        >
          <FontAwesome name='comments' size={25} color={'black'} style={{ marginRight: 5 }} />
          <Text style={{ fontWeight: 'bold' }}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
          <MaterialCommunityIcons name='human-greeting-variant' size={25} color={'black'} style={{ marginRight: 5 }} />
          <Text style={{ fontWeight: 'bold' }}>Connect</Text>
        </TouchableOpacity>
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
