import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AddBadgesContext from './AddBadgesContext';
import lampostAPI from '../../../apis/lampost';
import { connect } from 'react-redux';
import { baseBackgroundColor } from '../../../utils/colorsTable';

// components
import Badges from './Badges/Container';
import SearchBadgeBottomSheet from './SearchBadgeBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';

// ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const [meetupBadges, setMeetupBadges] = useState({});
  const [fromComponent, setFromComponent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queriedBadges, setQueriedBadges] = useState([]);
  const [queryType, setQueryType] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(null);
  const [selectedUserBadges, setSelectedUserBadges] = useState({});
  const [selectedMeetupBadges, setSelectedMeetupBadges] = useState({});
  const [tappedBadge, setTappedBadge] = useState(null);

  const searchBadgeBottomSheetRef = useRef(null);
  const badgeDetailBottomSheetRef = useRef(null);

  // ADD_USER_BADGESの時のcomponent
  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
      setFromComponent('ADD_USER_BADGES');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddUserBadgesPress()}>
            <Text style={{ color: 'white' }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [selectedUserBadges]);
  const onDoneAddUserBadgesPress = () => {
    const badgeIds = Object.values(selectedUserBadges).map((badge) => {
      return badge._id;
    });
    console.log("I'm adding these badges", badgeIds);
    // const result = await lampostAPI.patch(`/users/${props.auth.data._id}/addbadges`, { badgeIds });
    // const { badges } = result.data;
    props.navigation.navigate('Personal page', { userId: props.auth.data._id, addedUserBadges: badgeIds });
  };

  // ADD_MEETUP_BADGESの時。
  useEffect(() => {
    if (props.route.params?.fromComponent === 'ADD_MEETUP_BADGES') {
      setFromComponent('ADD_MEETUP_BADGES');
      // setRequiredBadges((previous) => {
      //   return {
      //     ...previous,
      //     ...props.route.params.badges,
      //   };
      // });
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onAddMeetupBadgesDone()}>
            <Text>Done(meet)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [meetupBadges]);
  // うん。上でやると、useEffectでstackoverflow的なことが起こっている。だから下で分けてやる必要がありそう。

  // launch meetupから来た既に選択済みのmeetup badgesがここのcomponentに送られ、それをそのままcomponentのstateにセットする。
  // 上のuseEffectでこれをやるとstackoverflowを起こす。だから、これで分けている。
  useEffect(() => {
    if (props.route.params?.meetupBadges) {
      setMeetupBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.meetupBadges,
        };
      });
    }
  }, []);

  const onAddMeetupBadgesDone = () => {
    props.navigation.navigate('Map', { meetupBadges });
  };

  // query
  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
      queryBadges(props.auth.data._id);
    } else if (props.route.params.fromComponent === 'ADD_MEETUP_BADGES') {
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
    setQueriedBadges(badges);
    setPage(2);
  };

  return (
    <AddBadgesContext.Provider
      value={{
        fromComponent,
        queriedBadges,
        selectedUserBadges,
        setSelectedUserBadges,
        badgeDetailBottomSheetRef,
        searchBadgeBottomSheetRef,
        searchQuery,
        setSearchQuery,
        queryType,
        setQueryType,
        tappedBadge,
        setTappedBadge,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Badges
        // badgeState={badge}
        // meetupBadges={meetupBadges}
        // badges={badges}
        // onBadgePress={onBadgePress}
        // fromComponent={fromComponent}
        />
        {/* <SearchBadgeBottomSheet
        searchBadgeBottomSheetRef={searchBadgeBottomSheetRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        queryType={queryType}
        setQueryType={setQueryType}
        /> */}
        <BadgeDetailBottomSheet />
        <SearchBadgeBottomSheet />
        {/* <TappedBadgeBottomSheet
          fromComponent={fromComponent}
          badge={badge}
          setBadge={setBadge}
          meetupBadges={meetupBadges}
          setMeetupBadges={setMeetupBadges}
          tappedBadgeBottomSheetRef={tappedBadgeBottomSheetRef}
          closeTappedBadgeBottomSheet={closeTappedBadgeBottomSheet}
        /> */}
      </View>
    </AddBadgesContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(Container);
