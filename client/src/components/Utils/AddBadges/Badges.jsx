import React, { useState, useEffect, useRef } from 'react';
import BadgeContext from './BadgeContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import Badge from './Badge';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import TappedBadgeBottomSheetRef from './BadgeDetailBottomSheet/Container';

// 結局、違いはbadgeを押した時のonPressの挙動だけなのよ。そこをどうするか。
const Container = (props) => {
  const renderBadges = () => {
    const badgesList = props.badges.map((badge, index) => {
      return (
        <BadgeContext.Provider value={{ badge }}>
          <Badge
            // user={props.user}
            key={index}
            fromComponent={props.fromComponent}
            badgeState={props.badgeState}
            meetupBadges={props.meetupBadges}
            badge={badge}
            onBadgePress={props.onBadgePress}
          />
        </BadgeContext.Provider>
      );
    });

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>;
  };

  if (props.badges.length) {
    return <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>{renderBadges()}</ScrollView>;
  } else {
    return <Text>Now loadinggggg...</Text>;
  }
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, selectedBadges: Object.values(state.selectedItem.badges), auth: state.auth };
};

export default connect(mapStateToProps)(Container);
