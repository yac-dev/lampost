import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge as RNPBadge, IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  const [selected, setSelected] = useState(false);

  // const onPressBadge = () => {
  //   if(props.selectedBadges[props.badge._id]){
  //     selectBadge()
  //   } else {
  //     removeBadge
  //   }
  // };

  const selectBadge = () => {
    setSelected(true);
    props.selectBadge(props.badge);
  };

  const removeBadge = () => {
    setSelected(false);
    props.removeBadge(props.badge);
  };

  {
    /* {props.selectedBadges[props.badge._id] ? (
          <RNPBadge visible={true} size={30} style={{ top: 0, position: 'absolute' }}>
            1
          </RNPBadge>
        ) : null} */
  }

  const renderBadge = (
    onPressBadge
    // tintColor, backgroundColor, textColor, borderColor
  ) => {
    if (props.selectedBadges[props.badge._id]) {
      return (
        <View>
          <TouchableOpacity
            style={{
              // flexDirection: 'row',
              // alignSelf: 'flex-start',
              alignItems: 'center',
              borderRadius: 7,
              // backgroundColor,
              borderStyle: 'solid',
              borderColor: props.badge.color,
              borderWidth: 1,
              padding: 15,
              // marginLeft: 5,
              marginRight: 10,
              marginBottom: 10,
              maxWidth: 150,
              height: 100,
              backgroundColor: props.badge.color,
              // marginTop: 5,
            }}
            onPress={() => {
              // onPressBadge();
              removeBadge();
            }}
          >
            <FastImage
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={{
                uri: props.badge.icon,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              tintColor={'white'}
              // resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.badge.name}</Text>

            {/* <Foundation
              name='sheriff-badge'
              size={24}
              color={'#25C213'}
              style={{ top: -10, right: -10, position: 'absolute' }}
            /> */}
            <View style={{ border: 5, top: 0, right: 0, position: 'absolute', color: '#989898' }}>
              <Text>10k</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (!selected) {
      return (
        <TouchableOpacity
          style={{
            // flexDirection: 'row',
            // alignSelf: 'flex-start',
            alignItems: 'center',
            borderRadius: 7,
            // backgroundColor,
            borderStyle: 'solid',
            borderColor: '#D7D7D7',
            borderWidth: 1,
            padding: 15,
            // marginLeft: 5,
            marginRight: 10,
            marginBottom: 10,
            maxWidth: 150,
            height: 100,
            // marginTop: 5,
          }}
          onPress={() => {
            // onPressBadge();
            selectBadge();
          }}
        >
          <FastImage
            style={{ width: 35, height: 35, marginBottom: 5 }}
            source={{
              uri: props.badge.icon,
              // headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            tintColor={props.badge.color}
            // resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.badge.name}</Text>
          <View
            style={{
              // borderRadius: 10,
              // borderColor: '#D7D7D7',
              // borderWidth: 1,
              // padding: 2,
              top: 0,
              right: 0,
              position: 'absolute',
              color: '#989898',
              // backgroundColor: '#D7D7D7',
            }}
          >
            <Text style={{ color: '#989898' }}>10k</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  // if (props.selectedBadges[props.badge._id]) {
  //   return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  // } else if (!selected) {
  //   return <>{renderBadge(selectBadge, props.badge.color, 'white', 'black', 'rgba(148, 148, 148, 0.85)')}</>;
  // }
  return <>{renderBadge()}</>;
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Badge);
