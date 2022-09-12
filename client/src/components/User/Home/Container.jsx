// main libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper';
import lampostAPI from '../../../apis/lampost';

// components
import Header from './Header';
import Badges from './Badges';
import Bio from './Bio';
import FABMenu from '../Utils/FABMenu';

const Container = (props) => {
  const [user, setUser] = useState(null);
  console.log(props.route.params._id); // このidを使って、backendのapiでuser情報をとってくればいいだけだからね。

  useEffect(() => {
    // ここで、_id使って、user情報をfetchしてくる。
    const getUser = async () => {
      const result = await lampostAPI.get(`/users/${props.route.params._id}`);
      const { user } = result.data;
      setUser(user);
    };
    getUser();
  }, []);

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header user={user} />
        <Badges user={user} />
        <Bio user={user} />
        <FABMenu user={user} />
      </SafeAreaView>
    );
  } else {
    return null;
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
