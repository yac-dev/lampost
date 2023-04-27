import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {
  baseBackgroundColor,
  baseTextColor,
  inputBackgroundColorNew,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

// iconをfetchしてきて、
const Container = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const [badgeIcon, setBadgeIcon] = useState(null);
  const [badgeNameTextInput, setBadgeNameTextInput] = useState(''); // emojiは入れないようにしたい絵文字判別をしよう。
  const [badgeColor, setBadgeColor] = useState('');

  // /\p{Emoji}/u.test('flowers') // emojiのdetection

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('hello')}
          disabled={badgeIcon && badgeNameTextInput && badgeColor ? false : true}
        >
          <Text
            style={{
              color: badgeIcon && badgeNameTextInput && badgeColor ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: badgeIcon && badgeNameTextInput && badgeColor ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [badgeIcon, badgeNameTextInput, badgeColor]);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 5, color: 'white' }}>Create badge</Text>
      <Text style={{ color: baseTextColor, marginBottom: 25 }}>
        Choose an icon, unique badge name and badge color to create meaningful badge. This badge will be also shared
        with everyone.
      </Text>
      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: inputBackgroundColorNew,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          alignSelf: 'center',
        }}
        onPress={() => props.navigation.navigate('Icon picker')}
      >
        <View style={{}}>
          <MaterialCommunityIcons name='plus' size={30} color={'white'} style={{ alignSelf: 'center' }} />
          <Text style={{ textAlign: 'center', color: 'white' }}>Choose an icon</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        placeholder='Badge name here'
        placeholderTextColor={baseTextColor}
        value={badgeNameTextInput}
        onChangeText={(text) => setBadgeNameTextInput(text)}
        style={{ fontSize: 22, marginBottom: 10, alignSelf: 'center', color: 'white' }}
      />
      <View>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['red1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('red1')}
          >
            {badgeColor === 'red1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('blue1')}
          >
            {badgeColor === 'blue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['orange1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('orange1')}
          >
            {badgeColor === 'orange1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['green1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('green1')}
          >
            {badgeColor === 'green1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['violet1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('violet1')}
          >
            {badgeColor === 'violet1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['yellow1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('yellow1')}
          >
            {badgeColor === 'yellow1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['lightBlue1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('lightBlue1')}
          >
            {badgeColor === 'lightBlue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['lightGreen1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('lightGreen1')}
          >
            {badgeColor === 'lightGreen1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['pink1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('pink1')}
          >
            {badgeColor === 'pink1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Text>Badge genre</Text>
      <TouchableOpacity>
        <Text style={{ color: 'white' }}>foods & drinks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Container;
