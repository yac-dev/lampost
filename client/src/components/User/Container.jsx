// main libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper';
import lampostAPI from '../../apis/lampost';

// components
import Header from './Home/Header';
import ActionButtons from './Home/ActionButtons';
import Badges from './Home/Badges';
import Bio from './Home/Bio';
import FABMenu from './Utils/FABMenu';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ここで、_id使って、user情報をfetchしてくる。
    const getUser = async () => {
      const result = await lampostAPI.get(`/users/${props.route.params.userId}`);
      const { user } = result.data;
      setUser(user);
    };
    getUser();
  }, []);

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header user={user} />
        <ActionButtons user={user} />
        {/* <Bio user={user} /> */}
        <Badges user={user} navigation={props.navigation} />
        <FABMenu user={user} />
      </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Container;
