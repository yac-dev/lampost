import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import Badge from './Badge';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import TappedBadgeBottomSheetRef from './TappedBadgeBottomSheet/Container';

//ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const renderBadges = () => {
    const badgesList = props.badges.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>{badgesList}</View>
      </ScrollView>
    );
  };

  if (props.badges.length) {
    return <View>{renderBadges()}</View>;
  } else {
    return <Text>Now loadinggggg...</Text>;
  }
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, selectedBadges: Object.values(state.selectedItem.badges), auth: state.auth };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(Container);
