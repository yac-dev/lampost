import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../../utils/colorsTable';

const FriendChatRoomContainer = (props) => {
  console.log(props.route.params.userId);
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text>Room</Text>
    </View>
  );
};

export default FriendChatRoomContainer;
