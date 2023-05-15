import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, AntDesign } = iconsTable;

const BadgeName = () => {
  const { accordion, setAccordion, setBadgeNameTextInput, badgeNameTextInput } = useContext(FormContext);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                name: !previous.name,
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
            <AntDesign name='edit' size={25} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Badge name</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  name: !previous.name,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.name ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.name ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', color: baseTextColor, marginBottom: 10 }}>
            Note that badge name should be unique. {badgeNameTextInput.replace(/ /g, '').length}/20
          </Text>

          <TextInput
            placeholder='Type badge name'
            placeholderTextColor={baseTextColor}
            value={badgeNameTextInput}
            onChangeText={(text) => setBadgeNameTextInput(text)}
            autoCapitalize='none'
            style={{ color: 'white', padding: 10, borderRadius: 5, backgroundColor: inputBackgroundColorNew }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default BadgeName;
