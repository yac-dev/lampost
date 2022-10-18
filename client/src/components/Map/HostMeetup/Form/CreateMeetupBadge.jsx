import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';

// components
import SelectedBadges from '../../../Utils/SelectedBadges/Badges';

//ac
import { setIsSelectMeetupBadgesModalOpen } from '../../../../redux/actionCreators/modal';

const CreateMeetupBadge = (props) => {
  const disableIconButton = () => {
    if (!props.selectedBadges.length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
        >
          <Text>Next</Text>
          <IconButton icon='arrow-right' iconColor={'blue'} size={20} disabled={disableIconButton()} />
        </TouchableOpacity>
      </View> */}
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>What kind of meetup you'll launch?</Text>
        <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
          <Button
            icon='plus'
            mode='outlined'
            onPress={() => props.navigation.navigate('Add badges')}
            style={{ width: 150 }}
          >
            Add
          </Button>
        </View>
        <SelectedBadges />

        <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
          <Text>{props.selectedBadges.length}/5</Text>
        </View>
      </View>
      <Button mode='outlined' onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}>
        Next
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps, { setIsSelectMeetupBadgesModalOpen })(CreateMeetupBadge);
