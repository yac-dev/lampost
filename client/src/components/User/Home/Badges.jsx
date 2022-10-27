// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../../apis/lampost';
import { View, Text } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

import Badge from './Badge';

// これ、paramsにfunctionを渡せるわ。
const Badges = (props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderBadges = () => {
    if (props.user.badges.length) {
      const badgesList = props.user.badges.map((badge, index) => {
        return <Badge key={index} badge={badge} />;
      });

      return <View>{badgesList}</View>;
    } else {
      return (
        <View>
          <Text>No badges yet...</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={{ alignSelf: 'flex-end' }}>
        {props.auth.data._id === props.user._id ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{ alignSelf: 'flex-end' }}
            anchor={
              <Button onPress={openMenu} style={{ alignSelf: 'flex-end' }}>
                Edit
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Add badges', { headerRight: 'Edit user badges' });
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
      </View>
      {renderBadges()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Badges);
