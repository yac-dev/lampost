import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Chats = (props) => {
  const renderChats = () => {
    const chatsList = props.chats.map((chat, index) => {
      return (
        <View key={index} style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Avatar.Text size={24} label='XD' /> */}
            {/* <Text style={{ marginLeft: 10 }}>
              {chat.user.name.firstName} {chat.user.name.lastName}
            </Text> */}
            <Text>{chat.createdAt}</Text>
          </View>
          <Text>{chat.content}</Text>
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

  if (!props.chats.length) {
    return (
      <View>
        <Text>No comments yet.</Text>
      </View>
    );
  } else {
    return (
      <View>
        <View>{renderChats()}</View>
      </View>
    );
  }
};

export default Chats;
