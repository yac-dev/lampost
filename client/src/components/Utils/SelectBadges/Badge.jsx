// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Badge as RNPBadge } from 'react-native-paper';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  const [selected, setSelected] = useState(false);

  const selectBadge = () => {
    setSelected(true);
    props.selectBadge(props.badge);
  };

  const removeBadge = () => {
    setSelected(false);
    props.removeBadge(props.badge);
  };

  const renderBadge = (onPressBadge, tintColor, backgroundColor, textColor, borderColor) => {
    if (props.selectedBadges[props.badge._id]) {
      return (
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              borderRadius: 20,
              // backgroundColor,
              borderStyle: 'solid',
              // borderColor,
              borderWidth: 1,
              padding: 10,
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={() => {
              onPressBadge();
            }}
          >
            <Image source={props.badge.source} style={{ width: 30, height: 30, tintColor: tintColor }} />
            <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
          </TouchableOpacity>
          <RNPBadge visible={true} size={30} style={{ top: 0, position: 'absolute' }}>
            1
          </RNPBadge>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            borderRadius: 20,
            // backgroundColor,
            borderStyle: 'solid',
            // borderColor,
            borderWidth: 1,
            padding: 10,
            marginLeft: 5,
            marginTop: 5,
          }}
          onPress={() => {
            onPressBadge();
          }}
        >
          <Image source={props.badge.source} style={{ width: 30, height: 30, tintColor: tintColor }} />
          <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
        </TouchableOpacity>
      );
    }
  };

  if (props.selectedBadges[props.badge._id]) {
    return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  } else if (!selected) {
    return <>{renderBadge(selectBadge, props.badge.color, 'white', 'black', 'rgba(148, 148, 148, 0.85)')}</>;
  }

  // if (!selected) {
  //   return <>{renderBadge(selectBadge, props.badge.color, 'white', 'black', 'rgba(148, 148, 148, 0.85)')}</>;
  // } else if (selected) {
  //   return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  // } else if (props.badge.id in props.selectedBadges) {
  //   return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  // }
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Badge);
