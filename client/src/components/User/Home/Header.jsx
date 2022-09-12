// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Avatar.Text size={60} label='JI' />
      <View>
        <Text>
          {props.user.name.firstName} {props.user.name.lastName}
        </Text>
      </View>
    </View>
  );
};

export default Header;
