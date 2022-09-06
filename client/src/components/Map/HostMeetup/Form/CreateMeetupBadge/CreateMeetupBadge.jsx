import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';

// components

//ac
import { setIsSelectMeetupBadgeElementsModalOpen } from '../../../../../redux/actionCreators/modal';

// assets

// iconを全部ぴっぱってきて、それをlistでrenderすればいい。
const MeetupBadge = (props) => {
  return (
    <View>
      <IconButton
        icon='arrow-right'
        iconColor={'blue'}
        size={20}
        onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DATES', payload: '' })}
      />
      <View style={{ paddingRight: 15, paddingLeft: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>What kind of meetup are you gonna host? (Up to 4 tags)</Text>
        <View>
          <Text>Render Selected badges here</Text>
        </View>
        <Button
          icon='plus'
          mode='outlined'
          onPress={() => props.setIsSelectMeetupBadgeElementsModalOpen(true)}
          style={{ width: 200 }}
        >
          Add badge
        </Button>
      </View>
    </View>
  );
};

export default connect(null, { setIsSelectMeetupBadgeElementsModalOpen })(MeetupBadge);
