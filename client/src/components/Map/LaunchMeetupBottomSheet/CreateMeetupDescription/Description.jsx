import React, { useContext } from 'react';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  baseTextColor,
  inputBackgroundColor,
  sectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const Description = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const { formData, setFormData } = useContext(LaunchMeetupContext);
  const inputAccessoryViewID = 'DESCRIPTION_INPUT';

  const renderDescriptionLength = () => {
    if (formData.description.length >= 501) {
      return <Text style={{ fontSize: 13, color: 'red' }}>OOPS! {formData.description.length}/500</Text>;
    } else {
      return <Text style={{ fontSize: 13, color: baseTextColor }}>{formData.description.length}/500</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['lightGreen1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            marginRight: 12,
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons name='message-text' size={25} color={iconColorsTable['lightGreen1']} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>
              Description/Message
            </Text>
            {renderDescriptionLength()}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: baseTextColor, flexShrink: 1 }}>
              More detail info or message to the attendees
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <BottomSheetTextInput
          style={{
            // height: 100,
            flex: 1,
            backgroundColor: inputBackgroundColor,
            borderRadius: 5,
            padding: 10,
            color: baseTextColor,
          }}
          multiline={true}
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          value={formData.description}
          onChangeText={(text) =>
            setFormData((previous) => {
              return {
                ...previous,
                description: text,
              };
            })
          }
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
    </View>
  );
};

export default Description;
