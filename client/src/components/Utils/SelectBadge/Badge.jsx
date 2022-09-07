// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
// icons
import foodAndBeverage from '../../../../assets/badgeObjects/foodAndBeverage';
import appsAndProducts from '../../../../assets/badgeObjects/appsAndProducts';

const Badge = (props) => {
  const [selected, setSelected] = useState(false);

  const renderBadge = (tintColor, backgroundColor, textColor = 'black', borderColor = 'rgba(148, 148, 148, 0.85)') => {
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
          setSelected((previousState) => {
            return !previousState;
          });
          props.selectBadge(props.badge);
        }}
      >
        <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: tintColor }} />
        <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
      </TouchableOpacity>
    );
  };

  if (!selected) {
    return <>{renderBadge(props.badge.color, 'white')}</>;
  } else {
    return <>{renderBadge('white', props.badge.color, 'white', props.badge.color)}</>;
  }
};

export default connect(null, { selectBadge })(Badge);
