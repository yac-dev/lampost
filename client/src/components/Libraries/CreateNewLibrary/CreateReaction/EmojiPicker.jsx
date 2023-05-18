import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import { emojis } from '../../../../utils/emojisList';
import {
  baseBackgroundColor,
  inputBackgroundColorNew,
  disabledTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';

// smilyAndPeople, animalsAndNature, foodAndDrink, objects, flags, symbols, travelAndPlaces, activity

const EmojiPicker = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 8;
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [filterOption, setFilterOption] = useState('smileyAndPeople');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() =>
            props.navigation.navigate({ name: 'Create new library', params: { selectedEmoji }, merge: true })
          }
          disabled={selectedEmoji ? false : true}
        >
          <Text
            style={{
              color: selectedEmoji ? 'white' : disabledTextColor,
              fontSize: 20,
              fontWeight: selectedEmoji ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedEmoji]);

  const renderEmojis = () => {
    const list = emojis[filterOption].map((emoji, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectedEmoji(emoji);
            }}
          >
            <Text style={{ fontSize: 35 }}>{emoji}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 80 }}>{selectedEmoji}</Text>
      </View>
      {renderEmojis()}
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: screenSectionBackgroundColor, position: 'absolute', width: '100%', bottom: 0 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // alignSelf: 'center',
            // paddingTop: 5,
            // paddingBottom: 5,
            // padding: 5,
          }}
        >
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'smileyAndPeople' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('smileyAndPeople')}
            >
              <Text style={{ fontSize: 35 }}>😀</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'animalsAndNature' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('animalsAndNature')}
            >
              <Text style={{ fontSize: 35 }}>🐶</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'foodAndDrink' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('foodAndDrink')}
            >
              <Text style={{ fontSize: 35 }}>🍕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'activity' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('activity')}
            >
              <Text style={{ fontSize: 35 }}>🎾</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'travelAndPlaces' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('travelAndPlaces')}
            >
              <Text style={{ fontSize: 35 }}>✈️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'objects' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('objects')}
            >
              <Text style={{ fontSize: 35 }}>📱</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'symbols' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('symbols')}
            >
              <Text style={{ fontSize: 35 }}>❤️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'flags' ? iconColorsTable['blue1'] : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('flags')}
            >
              <Text style={{ fontSize: 35 }}>🌎</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmojiPicker;
