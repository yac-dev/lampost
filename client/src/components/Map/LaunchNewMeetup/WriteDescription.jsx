import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { baseBackgroundColor, baseTextColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import { emojis } from '../../../utils/emojisList';

const WriteDescription = (props) => {
  const inputAccessoryViewID = 'MEETUP_DESCRIPTION_INPUT';
  const textInputRef = useRef(null);
  const [writingText, setWritingText] = useState('');

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Launch new meetup', { description: writingText })}
          disabled={writingText ? false : true}
        >
          <Text
            style={{
              color: writingText ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [writingText]);

  useEffect(() => {
    if (props.route.params?.description) {
      setWritingText(props.route.params.description);
    }
  }, [props.route.params?.description]);

  const renderEmoji = (emoji) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} onPress={() => setSendingText((previous) => previous + emoji)}>
        <Text>{emoji}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ height: '100%', flexDirection: 'row' }}>
        <TextInput
          multiline={true}
          placeholder={'Write in here...'}
          placeholderTextColor={baseTextColor}
          inputAccessoryViewID={inputAccessoryViewID}
          style={{
            borderRadius: 10,
            height: '100%',
            // padding: 10,
            // backgroundColor: 'rgb(235, 235, 235)',
            width: '100%', // ここも、下の修正に沿って80 90%に変える。
          }}
          color={baseTextColor}
          ref={textInputRef}
          value={writingText}
          onChangeText={setWritingText}
          autoCapitalize='none'
        />
      </View>
    </View>
  );
};

export default WriteDescription;
