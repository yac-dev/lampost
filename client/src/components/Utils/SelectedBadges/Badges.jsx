// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// components
import Badge from './Badge';

const Badges = (props) => {
  const renderBadges = () => {
    const selectedBadgesList = props.selectedBadges.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{selectedBadgesList}</View>;
  };
  return <>{renderBadges()}</>;
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps)(Badges);
