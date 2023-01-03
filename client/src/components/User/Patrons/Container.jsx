import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Container = (props) => {
  console.log(props.route.params.userId);
  const [user, setUser] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text style={{ color: 'red' }}>People who support this user</Text>
    </View>
  );
};

export default Container;
