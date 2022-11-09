// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

// components
import Badge from './Badge';

const Badges = (props) => {
  const renderBadges = () => {
    const selectedBadgesList = props.requiredBadges.map((badge, index) => {
      return <Badge key={index} badge={badge} />;
    });

    return (
      <ScrollView horizontal={true}>
        {/* <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.navigate('Add badges')}>
          <Text>Add</Text>
        </TouchableOpacity> */}

        {selectedBadgesList}
      </ScrollView>
    );
  };

  if (!props.requiredBadges.length) {
    return <Text style={{ fontWeight: 'bold' }}>No badges added yet...</Text>;
  } else {
    return <>{renderBadges()}</>;
  }
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps)(Badges);
