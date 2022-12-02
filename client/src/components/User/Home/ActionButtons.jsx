// main libraries
import React from 'react';
import UserContext from '../Context';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';

const ActionButtons = (props) => {
  // amIAuthenticatedっていうstate名の方がいいかもな。
  const { user, isMyPage } = useContext(UserContext);
  // const baseHeight = Dimensions.get('window').height / 20;
  if (props.auth.isAuthenticated) {
    // 自分のpageじゃやないならこれをrenderする。
    // if (user._id !== props.auth.data._id) {
    //   return (
    //     <View style={{ flexDirection: 'row' }}>
    //       <Button mode='outlined'>Subscribe</Button>
    //       <Button mode='outlined' onPress={() => console.log('connect with', props.user.name)}>
    //         Connect
    //       </Button>
    //       <Button mode='outlined' disabled={true}>
    //         Invite
    //       </Button>
    //     </View>
    //   );
    // } else {
    //   return null;
    // }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
        <View style={{ height: 50, backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: 15 }}>
          <View
            style={{
              backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              backgroundColor: iconColorsTable['blue1'],
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name='history' color={'white'} size={25} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Logs</Text>
          </View>
        </View>
        <View style={{ height: 50, backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: 15 }}>
          <View
            style={{
              backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              backgroundColor: iconColorsTable['blue1'],
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name='treasure-chest' color={'white'} size={25} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Assets</Text>
          </View>
        </View>
        <View style={{ height: 50, backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: 15 }}>
          <View
            style={{
              backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              backgroundColor: iconColorsTable['blue1'],
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 15,
            }}
          >
            <SimpleLineIcons name='user-follow' size={25} color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Subs</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return <Text>Signup or login to connect.</Text>;
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(ActionButtons);
