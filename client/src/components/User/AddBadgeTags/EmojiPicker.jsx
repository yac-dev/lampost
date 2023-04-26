import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import { emojis } from '../../../utils/emojisList';
import { baseBackgroundColor, disabledTextColor, inputBackgroundColorNew } from '../../../utils/colorsTable';

const EmojiPicker = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 8;
  const [selectedEmoji, setSelectedEmoji] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() => props.navigation.navigate({ name: 'Add badge tags', params: { selectedEmoji }, merge: true })}
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
    const list = emojis.map((emoji, index) => {
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
          width: 50,
          height: 50,
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 40 }}>{selectedEmoji}</Text>
      </View>
      {renderEmojis()}
    </View>
  );
};

export default EmojiPicker;
