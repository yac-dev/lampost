// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Divider, IconButton, Button } from 'react-native-paper';

const Header = (props) => {
  return (
    <View>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: 'rgb(235, 235, 237)',
          borderBottomWidth: 2,
          // backgroundColor: 'rgb(235, 235, 237)',
          // backgroundColor: 'red',
        }}
      >
        <View>
          <IconButton
            icon='close'
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20 }}>{props.title}</Text>
        </View>
        <View>
          <IconButton icon='check' iconColor='green' size={20} disabled onPress={() => console.log('Pressed')} />
        </View>
      </View>
      {/* <Divider style={{ fontWeight: 10 }} /> */}
    </View>
  );
};

export default Header;
