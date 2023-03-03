import React, { useContext } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, inputBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';

const TagTextInput = () => {
  const inputAccessoryViewID = 'BADGE_TAG_INPUT';
  const { creatingBadgeTagText, setCreatingBadgeTagText } = useContext(AddBadgeTagsContext);

  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>
        Please write a tag name and press "Add". ({creatingBadgeTagText.length}/ 20)
      </Text>
      <BottomSheetTextInput
        placeholder='Type here'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        style={{
          backgroundColor: inputBackgroundColor,
          padding: 10,
          borderRadius: 10,
          color: baseTextColor,
        }}
        value={creatingBadgeTagText}
        onChangeText={(text) => setCreatingBadgeTagText(text)}
        mode='outlined'
        autoCapitalize='none'
      />
      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor={screenSectionBackgroundColor}
        // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              setIsOpenTextInput(false);
              setCreatingBadgeTagText('');
              setCreatingBadgeTagNames((previous) => [...previous, creatingBadgeTagText]);
              Keyboard.dismiss();
            }}
            disabled={creatingBadgeTagText ? false : true}
          >
            <Text
              style={{
                color: creatingBadgeTagText ? 'white' : disabledTextColor,
                padding: 10,
                fontWeight: 'bold',
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default TagTextInput;
