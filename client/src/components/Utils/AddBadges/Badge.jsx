import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge as RNPBadge } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

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

  const renderBadge = (onPressBadge, tintColor, backgroundColor, textColor, borderColor) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          borderRadius: 20,
          backgroundColor,
          borderStyle: 'solid',
          borderColor,
          borderWidth: 1,
          padding: 10,
          marginLeft: 5,
          marginTop: 5,
        }}
        onPress={() => {
          onPressBadge();
        }}
      >
        <FastImage
          style={{ width: 30, height: 30 }}
          source={{
            uri: props.badge.icon,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          tintColor={props.badge.color}
          // resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.name}</Text>
      </TouchableOpacity>
    );
  };

  if (props.selectedBadges[props.badge._id]) {
    return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  } else if (!selected) {
    return <>{renderBadge(selectBadge, props.badge.color, 'white', 'black', 'rgba(148, 148, 148, 0.85)')}</>;
  }
  // return <>{renderBadge()}</>;
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Badge);
