// main libraries
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import UserContext from './Context';
import BadgeContext from './BadgeContext';
import lampostAPI from '../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseBackgroundColor, baseTextColor } from '../../utils/colorsTable';

// components
import Header from './Home/Header';
import Stats from './Home/Stats';
import Badge from './Badge';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const [user, setUser] = useState(null);
  const [badgeDatas, setBadgeDatas] = useState([]);
  const [pressedBadgeData, setPressedBadgeData] = useState(null);
  const [isMyPage, setIsMyPage] = useState();
  const badgeDetailBottomSheetRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);

  // これで、自分のpageを見ているか、他人のpageを見ているかのstateを管理する。
  useEffect(() => {
    if (props.auth.isAuthenticated && props.route.params.userId === props.auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getUser = async () => {
    const result = await lampostAPI.get(`/users/${props.route.params.userId}`);
    const { user } = result.data;
    console.log(user);
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getBadgeDatasByUserId = async () => {
    const result = await lampostAPI.get(`/badgeanduserrelationship/${props.route.params.userId}`);
    const { userBadgeDatas } = result.data;
    setBadgeDatas(userBadgeDatas);
  };
  useEffect(() => {
    getBadgeDatasByUserId();
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
    if (props.route.params?.addedUserBadges) {
      // setUser((previous) => {
      //   console.log('user data', previous);
      //   return { ...previous, badges: [...previous.badges, ...props.route.params.badges] };
      // });
      console.log('I added these badges', props.route.params.addedUserBadges);
    }
  }, [props.route.params?.addedUserBadges]);

  // const onBadgePress = async (badgeStatusId) => {
  //   // このuser pageのuser id、そしてbadgeを使ってget requestをする。
  //   const result = await lampostAPI.get(`/badgestatuses/${badgeStatusId}`);
  //   const { badgeStatus } = result.data;
  //   setTappedBadgeStatus(badgeStatus);
  //   // bottom sheetにこのbadge statusをrenderする、それを書く。多分、add badges側もこんな感じで変えることになる。
  // };

  const renderBadges = () => {
    if (badgeDatas.length) {
      const badgesList = badgeDatas.map((badgeData, index) => {
        return (
          <BadgeContext.Provider value={{ badgeData }}>
            <Badge key={index} />
          </BadgeContext.Provider>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor }}>No badges add yet...</Text>
        </View>
      );
    }
  };

  if (user) {
    return (
      <UserContext.Provider
        value={{
          user,
          isMyPage,
          navigation: props.navigation,
          appMenuBottomSheetRef,
          badgeDetailBottomSheetRef,
          pressedBadgeData,
          setPressedBadgeData,
        }}
      >
        <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
          <Header />
          <Stats />
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderBadges()}</ScrollView>
          <AppMenuBottomSheet />
          <BadgeDetailBottomSheet />
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
