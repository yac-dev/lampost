import React from 'react';
import { View, Text } from 'react-native';

const Chats = (props) => {
  const renderChats = () => {
    const chatsList = props.chats.map((chat, index) => {
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

  if (props.chats.length) {
    return (
      <View style={{ flex: 1 }}>
        <View>{renderChats()}</View>
        {/* <FABMenu navigation={props.navigation} meetup={meetup} /> */}
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Text>No comments yet.</Text>

        {/* <FABMenu navigation={props.navigation} meetup={meetup} /> */}
      </View>
    );
  }
};

export default Chats;
