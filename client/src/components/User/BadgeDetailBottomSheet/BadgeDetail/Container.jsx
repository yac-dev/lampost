import React, { useContext, useMemo } from 'react';
import UserContext from '../../Context';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

// components
// import BadgeDetail from '../../BadgeDetail/Container';
// import BadgeDetail from './BadgeDetail/Container';

const Container = (props) => {
  const { tappedBadge } = useContext(UserContext);

  return (
    <View>
      <Text style={{ color: baseTextColor }}>{tappedBadge.name}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Container);
