// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

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

  const renderBadge = (
    onPressBadge,
    tintColor,
    backgroundColor,
    textColor = 'black',
    borderColor = 'rgba(148, 148, 148, 0.85)'
  ) => {
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
        <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: tintColor }} />
        <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
      </TouchableOpacity>
    );
  };

  if (!selected) {
    return <>{renderBadge(selectBadge, props.badge.color, 'white')}</>;
  } else {
    return <>{renderBadge(removeBadge, 'white', props.badge.color, 'white', props.badge.color)}</>;
  }
};

export default connect(null, { selectBadge, removeBadge })(Badge);
