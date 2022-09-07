// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

const Badge = (props) => {
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
        console.log('hello');
      }}
    >
      <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: tintColor }} />
      <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
      <Text>X</Text>
    </TouchableOpacity>
  );
};

const SelectedBadges = (props) => {
  const renderSelectedBadges = () => {
    const selectedBadgesList = props.selectedBadges.map((badge) => {
      return <Badge badge={badge} />;
    });

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{selectedBadgesList}</View>;
  };
  return <>{renderSelectedBadges()}</>;
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps)(SelectedBadges);
