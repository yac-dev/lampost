import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
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
  const { auth } = useContext(GlobalContext);
  const [meetupBadges, setMeetupBadges] = useState({});
  const [fromComponent, setFromComponent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queriedBadges, setQueriedBadges] = useState([]);
  const [queryType, setQueryType] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(null);
  const [selectedUserBadges, setSelectedUserBadges] = useState({});
  const [addedMeetupBadges, setAddedMeetupBadges] = useState({});
  const [addedLibraryBadges, setAddedLibraryBadges] = useState({});
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
  const onDoneAddUserBadgesPress = async () => {
    // api requestではbadge idsとuserIdをpost dataとして送るのはよし。client側では、単純にbadge dataを送るだけでいい。
    const badgeIds = Object.keys(selectedUserBadges);
    console.log('Sending these badge ids', badgeIds);
    const result = await lampostAPI.post(`/badgeanduserrelationships/${auth.data._id}`, { badgeIds });
    const newBadgeDatas = Object.values(selectedUserBadges).map((selectedUserBadge) => {
      return {
        badge: selectedUserBadge,
        url: '',
      };
    });
    props.navigation.navigate('Personal page', { userId: auth.data._id, addedUserBadges: newBadgeDatas });
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
            <Text style={{ color: 'white' }}>Done(meet)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedMeetupBadges]);
  // うん。上でやると、useEffectでstackoverflow的なことが起こっている。だから下で分けてやる必要がありそう。

  // launch meetupから来た既に選択済みのmeetup badgesがここのcomponentに送られ、それをそのままcomponentのstateにセットする。
  // 上のuseEffectでこれをやるとstackoverflowを起こす。だから、これで分けている。
  useEffect(() => {
    if (props.route.params?.addedMeetupBadges) {
      setAddedMeetupBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedMeetupBadges,
        };
      });
    }
  }, []);
  const onAddMeetupBadgesDone = () => {
    props.navigation.navigate('Map', { addedMeetupBadges });
  };

  // ADD_LIBRARY_BADGESの時。
  useEffect(() => {
    if (props.route.params?.fromComponent === 'ADD_LIBRARY_BADGES') {
      setFromComponent('ADD_LIBRARY_BADGES');
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onAddLibraryBadgesDone()}>
            <Text style={{ color: 'white' }}>Done(library)</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedLibraryBadges]);

  useEffect(() => {
    if (props.route.params?.addedLibraryBadges) {
      setAddedLibraryBadges((previous) => {
        return {
          ...previous,
          ...props.route.params.addedLibraryBadges,
        };
      });
    }
  }, []);
  const onAddLibraryBadgesDone = () => {
    props.navigation.navigate('Libraries', { addedLibraryBadges });
  };

  // query
  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_USER_BADGES') {
      queryBadges(props.auth.data._id);
    } else if (props.route.params.fromComponent === 'ADD_MEETUP_BADGES') {
      queryBadges();
    } else if (props.route.params.fromComponent === 'ADD_LIBRARY_BADGES') {
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
        addedMeetupBadges,
        setAddedMeetupBadges,
        addedLibraryBadges,
        setAddedLibraryBadges,
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
