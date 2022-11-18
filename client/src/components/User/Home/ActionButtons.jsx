// main libraries
import React from 'react';
import UserContext from '../Context';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const ActionButtons = (props) => {
  // amIAuthenticatedっていうstate名の方がいいかもな。
  const { user, isMyPage } = useContext(UserContext);
  if (props.auth.isAuthenticated) {
    // 自分のpageじゃやないならこれをrenderする。
    if (user._id !== props.auth.data._id) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Button mode='outlined'>Subscribe</Button>
          <Button mode='outlined' onPress={() => console.log('connect with', props.user.name)}>
            Connect
          </Button>
          <Button mode='outlined' disabled={true}>
            Invite
          </Button>
        </View>
      );
    } else {
      return null;
    }
  } else {
    return <Text>Signup or login to connect.</Text>;
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(ActionButtons);
