// main libraries
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Menu } from 'react-native-paper';
import lampostAPI from '../../apis/lampost';

// components
import Header from './Home/Header';
import ActionButtons from './Home/ActionButtons';
import Badges from '../Utils/AddBadges/Badges';
import FABMenu from './Utils/FABMenu';
import BadgeStatusBottomSheet from './Home/BadgeStatusBottomSheet';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [badgeStatus, setBadgeStatus] = useState(null);

  const badgeStatusBottomSheetRef = useRef(null);

  useEffect(() => {
    // ここで、_id使って、user情報をfetchしてくる。
    console.log(props.route.params);
    const getUser = async () => {
      const result = await lampostAPI.get(`/users/${props.route.params.userId}`);
      const { user } = result.data;
      console.log(user);
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      const badges = user.badges.map((badgeStatus) => {
        return badgeStatus.badge;
      });
      setBadges(badges);
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

  const onBadgePress = async (badge) => {
    // このuser pageのuser id、そしてbadgeを使ってget requestをする。
    const result = await lampostAPI.post(`/badgestatuses/`, { user: user._id, badge: badge._id });
    const { badgeStatus } = result.data;
    setBadgeStatus(badgeStatus);
    // bottom sheetにこのbadge statusをrenderする、それを書く。多分、add badges側もこんな感じで変えることになる。
  };

  if (user) {
    return (
      <View style={{ padding: 10, flex: 1 }}>
        <Header user={user} />
        <ActionButtons user={user} />
        <Text>Badges</Text>
        {/* {props.auth.data._id === user._id ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{ alignSelf: 'flex-end' }}
            anchor={
              <Button onPress={openMenu} style={{ alignSelf: 'flex-end' }}>
                Edit
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Add badges', { fromComponent: 'Add user badges' });
              }}
              title='Add new badge'
            />
            <Menu.Item
              onPress={() => {
                console.log('create your badge!!');
              }}
              title='Create new badge'
            />
            <Menu.Item
              onPress={() => {
                console.log('delete badges');
              }}
              title='Remove'
            />
            <Menu.Item
              onPress={() => {
                console.log('create your badge!!');
              }}
              title='Request new badge'
            />
          </Menu>
        ) : null} */}
        <Badges user={user} badges={badges} onBadgePress={onBadgePress} />
        <FABMenu user={user} />
        <BadgeStatusBottomSheet badgeStatusBottomSheetRef={badgeStatusBottomSheetRef} badgeStatus={badgeStatus} />
      </View>
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
