import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stats = () => {
  const { user, isIpad } = useContext(UserContext);
  const oneContainerWidth = (Dimensions.get('window').width * 3) / 5;
  // const statsContainerWidth = oneContainerWidth * 0.45;

  // そうか。まあ焦るな。こういう場合。
  return (
    <View
      style={{
        // width: oneContainerWidth,
        // backgroundColor: 'red',
        marginRight: 50,
        // paddingLeft: 30
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['red1'],
              marginRight: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='fire' color={iconColorsTable['red1']} size={25} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>1245</Text>
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
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name='people' color={iconColorsTable['orange1']} size={25} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>84</Text>
        </View>
        <Text style={{ color: baseTextColor, fontSize: 17, fontWeight: 'bold' }}>Patrons</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
