// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../apis/lampost';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';

// components
import FABMenu from './Utils/FABMenu';
// ただ、ここではrouterで渡ってきたmeetupのidを使って呼び込んでくることになる。
// idで全てのchatのcommentを表示することになる。
// ここ、何でrerenderで同じobject出るんだろ。
const Container = (props) => {
  const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    console.log(meetup);
    setMeetup(meetup);
    setChats((previous) => [...previous, ...meetup.chats]);
  };

  useEffect(() => {
    getMeetup();
  }, []);

  const renderChats = () => {
    const chatsList = chats.map((chat, index) => {
      return (
        <View key={index} style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Text size={24} label='XD' />
            <Text style={{ marginLeft: 10 }}>
              {chat.user.name.firstName} {chat.user.name.lastName}
            </Text>
            <Text>{chat.createdAt}</Text>
          </View>
          <Text>{chat.content}</Text>
          {/* ここがactionsになるな。*/}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text>icon Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });

    return (
      <ScrollView style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 250 }}>
        {chatsList}
      </ScrollView>
    );
  };

  // ここで、chatをズラーとlistで並べていく。
  if (chats.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <View>{renderChats()}</View>
        <FABMenu navigation={props.navigation} meetup={meetup} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>No comments yet.</Text>
        <FABMenu navigation={props.navigation} meetup={meetup} />
      </View>
    );
  }
};

export default Container;
