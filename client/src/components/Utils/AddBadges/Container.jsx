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

const INITIAL_STATE = [];

const Container = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [badges, setBadges] = useState(INITIAL_STATE);
  const [tab, setTab] = useState('');
  const searchBadgeBottomSheetRef = useRef(null);
  const tappedBadgeBottomSheetRef = useRef(null);
  const [queryType, setQueryType] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(null);

  const closeTappedBadgeBottomSheet = () => {
    props.setIsTappedBadgeBottomSheetOpen(false, null);
    tappedBadgeBottomSheetRef.current?.close();
  };

  // const getBadges = async () => {
  //   const result = await lampostAPI.get('/badges');
  //   const { badges } = result.data;
  //   setBadges((previous) => [...previous, ...badges]);
  // };

  useEffect(() => {
    if (props.route.params.headerRight === 'userpage') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            // onPress={() => this.share()}
            onPress={() => console.log('Hello from add badge')}
          >
            {/* <MaterialCommunityIcons name='user' size={24} /> */}
            <Text>Done(useepage)</Text>
          </TouchableOpacity>
        ),
      });
    } else if (props.route.params.headerRight === 'createMeetup') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            // onPress={() => this.share()}
            onPress={() => console.log('Hello from create meetup')}
          >
            {/* <MaterialCommunityIcons name='plus' size={24} /> */}
            <Text>Done(meet)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  const queryBadgesByType = async () => {
    let queryString = '?page=1';
    const queryTypes = [...queryType];
    for (let i = 0; i < queryTypes.length; i++) {
      // if (i === 0) {
      //   queryString = '?type=' + queryTypes[i];
      // } else {
      queryString = queryString + '&type=' + queryTypes[i];
      // }
    }
    console.log(queryString);
    const result = await lampostAPI.get(`/badges/${queryString}`);
    const { badges } = result.data;
    setBadges(badges);
    setPage(2);
  };

  // load moreしたら、次の分のpage用にnumberを事前に更新しておく感じだな。
  const onPressSearch = async () => {
    if (!queryName) {
      return null;
    } else {
      let queryString = '?page=1';
      const queryTypes = [...queryType];
      for (let i = 0; i < queryTypes.length; i++) {
        // if (i === 0) {
        //   queryString = '?type=' + queryTypes[i];
        // } else {
        queryString = queryString + '&type=' + queryTypes[i];
        // }
      }
      queryString = queryString + '&name=' + queryName;
      const result = await lampostAPI.get(`/badges/${queryString}`);
      const { badges } = result.data;
      setBadges(badges);
      setPage(2);
    }
  };

  // useEffect(() => {
  //   getBadges();
  // }, []);

  useEffect(() => {
    queryBadgesByType();
  }, [queryType]);

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
      <SearchBadgeBottomSheet
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        queryType={queryType}
        setQueryType={setQueryType}
      />
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
