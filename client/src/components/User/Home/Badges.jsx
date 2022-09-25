// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const Badges = (props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Text>Badges</Text>
      {props.auth.data._id === props.user._id ? (
        <Menu visible={visible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>Edit</Button>}>
          <Menu.Item
            onPress={() => {
              console.log('add badge!!');
            }}
            title='Add new badge'
          />
          <Menu.Item
            onPress={() => {
              console.log('delete badges');
            }}
            title='Delete'
          />
          <Menu.Item
            onPress={() => {
              console.log('create your badge!!');
            }}
            title='Create your own'
          />
        </Menu>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Badges);
