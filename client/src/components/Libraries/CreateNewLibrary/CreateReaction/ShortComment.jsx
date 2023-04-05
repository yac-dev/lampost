import React, { useContext } from 'react';
import CreateReactionContext from './CreateReactionContext';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const ShortComment = () => {
  const { MaterialCommunityIcons } = iconsTable;
  const { accordion, setAccordion, creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                comment: !previous.comment,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['blue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='comment-text' size={25} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Short comment</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  comment: !previous.comment,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.comment ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.comment ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
            Please write a shor comment that....
          </Text>
          <TextInput
            placeholder='In 15 characters'
            placeholderTextColor={baseTextColor}
            style={{
              padding: 10,
              color: baseTextColor,
              backgroundColor: inputBackgroundColorNew,
              borderRadius: 5,
            }}
            value={creatingReaction.comment}
            onChangeText={(text) => {
              setCreatingReaction((previous) => {
                return {
                  ...previous,
                  comment: text,
                };
              });
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ShortComment;
