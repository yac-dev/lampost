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
    <View>
      <View style={{ alignItems: 'flex-end' }}>
        <IconButton
          icon='arrow-right'
          iconColor={'blue'}
          size={20}
          disabled={disableIconButton()}
          onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DATES', payload: '' })}
        />
      </View>
      <View style={{ paddingRight: 15, paddingLeft: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>What kind of meetup are you gonna host? (Up to 4 tags)</Text>
        <Button
          icon='plus'
          mode='outlined'
          onPress={() => props.setIsSelectMeetupBadgesModalOpen(true)}
          style={{ width: 200 }}
        >
          Add
        </Button>
        <SelectedBadges />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps, { setIsSelectMeetupBadgesModalOpen })(CreateMeetupBadge);
