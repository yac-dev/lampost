// main libraries
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UserContext from './Context';
import { Avatar, Menu } from 'react-native-paper';
import lampostAPI from '../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseBackgroundColor } from '../../utils/colorsTable';

// components
import Header from './Home/Header';
import ActionButtons from './Home/ActionButtons';
import Stats from './Home/Stats';
import Badges from '../Utils/AddBadges/Badges';
import BadgeStatuses from './Home/BadgeStatuses/Container';
import FABMenu from './Utils/FABMenu';
import BadgeStatusBottomSheet from './Home/BadgeStatusBottomSheet';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [tappedBadgeStatus, setTappedBadgeStatus] = useState(null);
  const [badgeStatuses, setBadgeStatuses] = useState([]);
  const [isMyPage, setIsMyPage] = useState();

  const badgeStatusBottomSheetRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);

  // これで、自分のpageを見ているか、他人のpageを見ているかのstateを管理する。
  useEffect(() => {
    if (props.route.params.userId === props.auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getUser = async () => {
    const result = await lampostAPI.get(`/users/${props.route.params.userId}`);
    const { user } = result.data;
    // console.log(user);
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => {
  //   // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
  //   props.navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => console.log('notify')}>
  //         <MaterialCommunityIcons name='mailbox' size={30} color={'blue'} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  useEffect(() => {
    if (user) {
      const badges = user.badges.map((badgeStatus) => {
        return badgeStatus.badge;
      });
      setBadges(badges);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const badgeStatuses = user.badges.map((badgeStatus) => {
        return badgeStatus;
      });

      setBadgeStatuses(badgeStatuses);
    }
  }, [user]);

  useEffect(() => {
    if (props.route.params?.badges) {
      setUser((previous) => {
        console.log('user data', previous);
        return { ...previous, badges: [...previous.badges, ...props.route.params.badges] };
      });
      console.log('from add badges to user', props.route.params.badges);
    }
  }, [props.route.params?.badges]);

  const onBadgePress = async (badgeStatusId) => {
    // このuser pageのuser id、そしてbadgeを使ってget requestをする。
    const result = await lampostAPI.get(`/badgestatuses/${badgeStatusId}`);
    const { badgeStatus } = result.data;
    setTappedBadgeStatus(badgeStatus);
    // bottom sheetにこのbadge statusをrenderする、それを書く。多分、add badges側もこんな感じで変えることになる。
  };

  if (user) {
    return (
      <UserContext.Provider value={{ user, isMyPage, navigation: props.navigation, appMenuBottomSheetRef }}>
        <View
          style={{
            // padding: 10,
            flex: 1,
            // backgroundColor: 'rgb(27, 27, 79)' この色いい。
            backgroundColor: baseBackgroundColor,
          }}
        >
          <Header />
          {/* <ActionButtons /> */}
          <Stats />
          <BadgeStatuses
            user={user}
            badgeStatuses={badgeStatuses}
            onBadgePress={onBadgePress}
            navigation={props.navigation}
          />
          <AppMenuBottomSheet />
          {/* <Badges user={user} badges={badges} onBadgePress={onBadgePress} /> */}
          {/* <FABMenu /> */}
          {/* <BadgeStatusBottomSheet
            badgeStatusBottomSheetRef={badgeStatusBottomSheetRef}
            tappedBadgeStatus={tappedBadgeStatus}
          /> */}
        </View>
      </UserContext.Provider>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

// Badgesにremoveのpropsを渡すようにする。

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  // },
});

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
