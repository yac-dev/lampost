import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { connect } from 'react-redux';

// components
import Badges from './Badges';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import TappedBadgeBottomSheet from './TappedBadgeBottomSheet/Container';

// ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const ContainerContainer = (props) => {
  const [badge, setBadge] = useState(null);
  const [fromComponent, setFromComponent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [badges, setBadges] = useState([]);
  const [queryType, setQueryType] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(null);

  const searchBadgeBottomSheetRef = useRef(null);
  const tappedBadgeBottomSheetRef = useRef(null);

  // header rightに関するuseEffect
  // add user badgeの時のcomponent
  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    if (props.route.params.fromComponent === 'Add user badges') {
      setFromComponent('Add user badges');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddUserBadgesPress()}>
            <Text>Done(user badges)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [props.selectedBadges]);

  const onDoneAddUserBadgesPress = async () => {
    const badgeIds = props.selectedBadges.map((badge) => {
      return badge._id;
    });
    console.log('These are badge ids', badgeIds);
    const result = await lampostAPI.patch(`/users/${props.auth.data._id}/addbadges`, { badgeIds });
    const { badges } = result.data;
    props.navigation.navigate('User', { userId: props.auth.data._id, badges });
  };

  // select meetup badgeの時
  useEffect(() => {
    if (props.route.params.fromComponent === 'Select meetup badge') {
      setFromComponent('Select meetup badge');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onSelectMeetupBadgeDone()}>
            <Text>Done(meetup badge)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [badge]);

  const onSelectMeetupBadgeDone = () => {
    props.navigation.navigate('Map', { badge });
  };

  // meetup badgesの時
  useEffect(() => {
    if (props.route.params.fromComponent === 'Add meetup badges') {
      setFromComponent('Add meetup badges');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddMeetupBadges()}>
            <Text>Done(meet)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  const onDoneAddMeetupBadges = () => {
    props.navigation.goBack();
  };

  // query
  useEffect(() => {
    if (props.route.params.fromComponent === 'Add user badges') {
      queryBadges(props.auth.data._id);
    } else if (props.route.params.fromComponent === 'Add meetup badges') {
      queryBadges();
    } else if (props.route.params.fromComponent === 'Select meetup badge') {
      queryBadges();
    }
  }, [queryType]);

  // getだがpost requestなの注意ね。
  const queryBadges = async (userId) => {
    let postBody = { userId: '' };
    if (userId) {
      postBody['userId'] = userId;
    }
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
    const result = await lampostAPI.post(`/badges/${queryString}`, postBody);
    const { badges } = result.data;
    setBadges(badges);
    setPage(2);
  };

  const closeTappedBadgeBottomSheet = () => {
    props.setIsTappedBadgeBottomSheetOpen(false, null);
    tappedBadgeBottomSheetRef.current?.close();
  };

  const onBadgePress = (badge) => {
    props.setIsTappedBadgeBottomSheetOpen(true, badge);
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Badges badgeState={badge} badges={badges} onBadgePress={onBadgePress} fromComponent={fromComponent} />
      <SearchBadgeBottomSheet
        searchBadgeBottomSheetRef={searchBadgeBottomSheetRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        queryType={queryType}
        setQueryType={setQueryType}
      />
      <TappedBadgeBottomSheet
        badge={badge}
        setBadge={setBadge}
        fromComponent={fromComponent}
        tappedBadgeBottomSheetRef={tappedBadgeBottomSheetRef}
        closeTappedBadgeBottomSheet={closeTappedBadgeBottomSheet}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(ContainerContainer);
