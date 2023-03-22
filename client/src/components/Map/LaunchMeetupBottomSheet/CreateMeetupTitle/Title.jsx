import React, { useContext } from 'react';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {
  iconColorsTable,
  baseTextColor,
  sectionBackgroundColor,
  inputBackgroundColor,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';

const Title = (props) => {
  const { formData, setFormData } = useContext(LaunchMeetupContext);
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const inputAccessoryViewID = 'TITLE_INPUT';

  const renderTitleLength = () => {
    if (formData.title.length <= 40) {
      return <Text style={{ fontSize: 13, color: baseTextColor }}>{formData.title.length}/40</Text>;
    } else {
      return <Text style={{ fontSize: 13, color: 'red' }}>OOPS! {formData.title.length}/40</Text>;
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['green1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            marginBottom: 5,
          }}
        >
          <AntDesign name='edit' size={25} color={iconColorsTable['green1']} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Title</Text>
            {renderTitleLength()}
          </View>
          <Text style={{ fontSize: 13, color: baseTextColor }}>In simple and catchy</Text>
        </View>
      </View>
      <View style={{ marginBottom: 15 }}>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          
        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
          <BottomSheetTextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColor,
              color: baseTextColor,
              borderRadius: 5,
            }}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.title}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  title: text,
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
    </View>
  );
};

export default Title;
