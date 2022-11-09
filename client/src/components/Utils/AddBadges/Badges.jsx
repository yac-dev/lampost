import React, { useState, useEffect, useRef } from 'react';
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
import TappedBadgeBottomSheetRef from './TappedBadgeBottomSheet/Container';

// 結局、違いはbadgeを押した時のonPressの挙動だけなのよ。そこをどうするか。
const Container = (props) => {
  const renderBadges = () => {
    const badgesList = props.badges.map((badge, index) => {
      return (
        <Badge
          user={props.user}
          key={index}
          fromComponent={props.fromComponent}
          badgeState={props.badgeState}
          requiredBadges={props.requiredBadges}
          badge={badge}
          onBadgePress={props.onBadgePress}
        />
      );
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>
      </ScrollView>
    );
  };

  const ren = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={true}
        data={props.badges}
        numColumns={4}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
              <Badge badge={item} onBadgePress={props.onBadgePress} />
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
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

export default connect(mapStateToProps)(Container);
