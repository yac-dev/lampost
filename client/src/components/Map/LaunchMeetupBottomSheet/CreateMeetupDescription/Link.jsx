import React, { useContext } from 'react';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { View, Text, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  backgroundColorsTable,
  iconColorsTable,
  inputBackgroundColor,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const Link = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const { formData, setFormData } = useContext(LaunchMeetupContext);
  const inputAccessoryViewID = 'URL_INPUT';
  const inputAccessoryViewIDForLinkName = 'LINK_NAME_INPUT';
  const { MaterialCommunityIcons } = iconsTable;

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['grey1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name='link' size={25} color={iconColorsTable['grey1']} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginBottom: 5 }}>Link (optional)</Text>
          <Text style={{ fontSize: 13, color: baseTextColor, flexShrink: 1 }}>External url if you need</Text>
        </View>
      </View>
      <BottomSheetTextInput
        style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 5, color: baseTextColor }}
        placeholder='URL'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        value={formData.link}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              link: text,
            };
          })
        }
        mode='outlined'
        autoCapitalize='none'
      />
      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor={sectionBackgroundColor}
        // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              launchMeetupBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default Link;
