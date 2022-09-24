// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../apis/lampost';
import { View, Text } from 'react-native';
import FABMenu from './Utils/FABMenu';

// ただ、ここではrouterで渡ってきたmeetupのidを使って呼び込んでくることになる。
// idで全てのchatのcommentを表示することになる。
const Container = (props) => {
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    const result = await lampostAPI.get('/chats');
    const { chats } = result.data;
    setChats((previous) => [...previous, chats]);
  };

  useEffect(() => {
    // getChats();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Chat component here!!</Text>
      <Text>{props.route.params.meetupId}</Text>
      <FABMenu navigation={props.navigation} />
    </View>
  );
};

export default Container;
