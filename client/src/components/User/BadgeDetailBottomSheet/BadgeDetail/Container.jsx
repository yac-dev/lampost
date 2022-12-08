import React, { useContext, useMemo } from 'react';
import UserContext from '../../UserContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';

import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

const Container = (props) => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default Container;
