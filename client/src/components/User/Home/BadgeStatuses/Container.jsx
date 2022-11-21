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
      {/* {props.auth.data._id === props.user._id ? (
        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'rgb(156, 156, 156)' }}>Add more badges to express yourself!</Text>
          <Button
            onPress={() => {
              props.navigation.navigate('Add badges', { fromComponent: 'Add user badges' });
            }}
            mode='outlined'
            icon={'plus'}
          >
            Add new
          </Button>
        </View>
      ) : 
      null} */}
      <BadgeStatuses user={props.user} badgeStatuses={props.badgeStatuses} onBadgePress={props.onBadgePress} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
