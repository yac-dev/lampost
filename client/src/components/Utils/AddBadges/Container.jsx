import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

// components
import Badge from './Badge';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import TappedBadgeBottomSheetRef from './TappedBadgeBottomSheet/Container';

//ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const INITIAL_STATE = [];

const Container = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [badges, setBadges] = useState(INITIAL_STATE);
  const [tab, setTab] = useState('');
  const searchBadgeBottomSheetRef = useRef(null);
  const tappedBadgeBottomSheetRef = useRef(null);

  const closeTappedBadgeBottomSheet = () => {
    props.setIsTappedBadgeBottomSheetOpen(false, null);
    tappedBadgeBottomSheetRef.current?.close();
  };

  const getBadges = async () => {
    const result = await lampostAPI.get('/badges');
    const { badges } = result.data;
    setBadges((previous) => [...previous, ...badges]);
  };

  const queryBadges = async (query) => {
    const result = await lampostAPI.get(`/badges/?=${query}`);
    const { badges } = result.data;
    // 一回、今もっているbadgeを消す。そして、取ってきたbadgeを足すっていうやり方。
    setBadges(badges);
  };

  useEffect(() => {
    getBadges();
  }, []);

  const renderBadges = () => {
    const badgesList = badges.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={{ flex: 3 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>
      </ScrollView>
    );
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      {/* <Searchbar
        placeholder='Search'
        style={{ height: 40, marginBottom: 20, borderRadius: 10, padding: 10 }}
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        autoCapitalize='none'
        // keyboardType={'visible-password'}
      /> */}
      {renderBadges()}
      <SearchBadgeBottomSheet searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TappedBadgeBottomSheetRef
        tappedBadgeBottomSheetRef={tappedBadgeBottomSheetRef}
        closeTappedBadgeBottomSheet={closeTappedBadgeBottomSheet}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(Container);
