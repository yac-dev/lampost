import React, { useContext } from 'react';
import { View, Text, TextInput, Keyboard, InputAccessoryView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import {
  inputBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import CreatedBadgeTags from './CreatedBadgeTags';

const BadgeTagTextInput = () => {
  const inputAccessoryViewID = 'BADGE_TAG_INPUT';
  const { setSnackBar } = useContext(GlobalContext);
  const {
    badgeTagTextInput,
    setBadgeTagTextInput,
    setCreatedBadgeTags,
    badgeTagOptions,
    alreadyHaveBadgeTags,
    addedBadgeTags,
    createdBadgeTags,
  } = useContext(AddBadgeTagsContext);
  const { MaterialCommunityIcons, Ionicons, AntDesign } = iconsTable;

  const addCreatedBadgeTag = () => {
    if (
      addedBadgeTags[badgeTagTextInput] ||
      alreadyHaveBadgeTags[badgeTagTextInput] ||
      badgeTagOptions[badgeTagTextInput] ||
      createdBadgeTags[badgeTagTextInput]
    ) {
      setSnackBar({
        isVisible: true,
        barType: 'warning',
        message: 'The badge tag name should be unique🤔',
        duration: 5000,
      });
    } else {
      Keyboard.dismiss();
      setBadgeTagTextInput('');
      setCreatedBadgeTags((previous) => {
        return {
          ...previous,
          [badgeTagTextInput]: badgeTagTextInput,
        };
      });
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['orange1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <AntDesign name='edit' color={iconColorsTable['orange1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Create my own</Text>
        </View>
      </View>
      <Text style={{ color: 'white', marginBottom: 15 }}>Couldn't find from above? Add new one from here.</Text>
      <TextInput
        placeholder='Type Tag name'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        value={badgeTagTextInput}
        onChangeText={setBadgeTagTextInput}
        style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor, color: 'white' }}
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
              addCreatedBadgeTag();
            }}
            disabled={!badgeTagTextInput ? true : false}
          >
            <Text
              style={{
                padding: 10,
                fontWeight: 'bold',
                color: badgeTagTextInput ? 'white' : disabledTextColor,
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

export default BadgeTagTextInput;
