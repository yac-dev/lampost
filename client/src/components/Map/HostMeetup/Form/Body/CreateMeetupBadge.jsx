import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';

// components
import MeetupBadgeElementsModal from './MeetupBadgeElementsModal';
import MeetupBadges from './MeetupBadges';

//ac
import { setIsSelectMeetupBadgeElementsModalOpen } from '../../../../../redux/actionCreators/modal';

// assets
import { foodAndBeverage } from '../../../../../../assets/images';
import { appsAndProducts } from '../../../../../../assets/images';
import { all } from '../../../../../../assets/images';

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
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>What kind of meetup are you gonna host? (Up to 4 tags)</Text>
        <View>
          <Text>Selected badges</Text>
        </View>
        <Searchbar placeholder='Search' style={{ height: 30, marginTop: 10 }} />

        <View style={{ marginTop: 10 }}>
          <MeetupBadges />
        </View>
      </View>
    </View>
  );
};

export default connect(null, { setIsSelectMeetupBadgeElementsModalOpen })(MeetupBadge);
