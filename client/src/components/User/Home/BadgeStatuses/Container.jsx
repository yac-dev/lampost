import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Menu, Button } from 'react-native-paper';

// components
import BadgeStatuses from './BadgeStatuses';

const Container = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View>
      <Text>Badges</Text>
      {props.auth.data._id === props.user._id ? (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          style={{ alignSelf: 'flex-end' }}
          anchor={
            <Button onPress={() => setMenuVisible(true)} style={{ alignSelf: 'flex-end' }}>
              Edit
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              props.navigation.navigate('Add badges', { fromComponent: 'Add user badges' });
              setMenuVisible(false);
            }}
            title='Add new badge'
          />
          <Menu.Item
            onPress={() => {
              console.log('create your badge!!');
            }}
            title='Create new badge'
          />
          <Menu.Item
            onPress={() => {
              console.log('delete badges');
            }}
            title='Remove'
          />
          <Menu.Item
            onPress={() => {
              console.log('create your badge!!');
            }}
            title='Request new badge'
          />
        </Menu>
      ) : null}
      <BadgeStatuses user={props.user} badgeStatuses={props.badgeStatuses} onBadgePress={props.onBadgePress} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
