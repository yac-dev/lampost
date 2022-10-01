// main libraries
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const commentType = {
  question: '?? Question',
};

const Communications = (props) => {
  const renderCommunication = () => {
    const communicationList = props.array.map((object, index) => {
      return (
        <View key={index}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'blue', borderRadius: 10 }}></View>
            <View style={{ marginLeft: 20 }}>
              <Text>{object.user.name}</Text>
              <Text>{object.type}</Text>
              <Text>{object.content}</Text>
            </View>
            <Text>Reply</Text>
          </View>
          {object.type === 'reply' ? <Text>{object.replyTo.content}</Text> : null}
        </View>
      );
    });

    return <View>{communicationList}</View>;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
      {renderCommunication()}
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default Communications;
