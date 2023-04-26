import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { baseTextColor, inputBackgroundColorNew } from '../../../utils/colorsTable';

const Example = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ color: baseTextColor, marginRight: 10 }}>e.g.)</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: inputBackgroundColorNew,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ marginRight: 5, fontSize: 18 }}>😎</Text>
            <Text style={{ fontSize: 18, color: baseTextColor }}>5 years experienced</Text>
          </View>
          <View
            style={{
              backgroundColor: inputBackgroundColorNew,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ marginRight: 5, fontSize: 18 }}>🔥</Text>
            <Text style={{ fontSize: 18, color: baseTextColor }}>addicted</Text>
          </View>
          <View
            style={{
              backgroundColor: inputBackgroundColorNew,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ marginRight: 5, fontSize: 18 }}>🤤</Text>
            <Text style={{ fontSize: 18, color: baseTextColor }}>everyday eating</Text>
          </View>
          <View
            style={{
              backgroundColor: inputBackgroundColorNew,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ marginRight: 5, fontSize: 18 }}>🎮</Text>
            <Text style={{ fontSize: 18, color: baseTextColor }}>everyday playing</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Example;
