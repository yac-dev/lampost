import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stats = () => {
  const { user, isIpad } = useContext(UserContext);
  const oneContainerWidth = Dimensions.get('window').width / 3;
  const statsContainerWidth = oneContainerWidth * 0.45;

  // そうか。まあ焦るな。こういう場合。
  return (
    <View
      style={{
        width: oneContainerWidth,
        // backgroundColor: 'red',
        // paddingLeft: 30
      }}
    >
      <View style={{ width: statsContainerWidth, alignSelf: 'flex-end' }}>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View
              style={{
                backgroundColor: backgroundColorsTable['red1'],
                marginRight: 10,
                borderRadius: 10,
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='fire' color={iconColorsTable['red1']} size={25} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>1245</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 17, fontWeight: 'bold' }}>Leadership</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View
              style={{
                backgroundColor: backgroundColorsTable['orange1'],
                marginRight: 10,
                borderRadius: 10,
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name='people' color={iconColorsTable['orange1']} size={25} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>84</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 17, fontWeight: 'bold' }}>Patrons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Stats;
