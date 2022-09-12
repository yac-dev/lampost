// main libraries
import React from 'react';
import { View, Text } from 'react-native';

const Badges = (props) => {
  const badges = props.badges.map((badge) => {
    return (
      <View>
        <Text>{badge.value}</Text>
      </View>
    );
  });
  return <div>Badges</div>;
};

export default Badges;
