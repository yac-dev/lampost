import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Stats = () => {
  const { Foundation, Entypo } = iconsTable;
  const { user, activitiesMenuBottomSheetRef, leadershipBottomSheetRef } = useContext(UserContext);

  if (user.launcher) {
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          // alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <View>
          <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Trust</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 27,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {user.fame}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default Stats;
