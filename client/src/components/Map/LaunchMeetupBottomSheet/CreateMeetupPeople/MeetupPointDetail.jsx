import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  backgroundColorsTable,
  iconColorsTable,
  inputBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const MeetupPointDetail = () => {
  const { MaterialIcons, MaterialCommunityIcons, Fontisto } = iconsTable;
  const inputAccessoryViewID = 'MEETUP_POINT_DETAIL_INPUT';
  const { formData, setFormData } = useContext(LaunchMeetupContext);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['red1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Fontisto name='map-marker-alt' size={20} color={iconColorsTable['red1']} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginBottom: 5 }}>Meetup point detail</Text>
          <Text style={{ color: baseTextColor, fontSize: 13 }}>Such as venue name, how to access etc</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <BottomSheetTextInput
          style={{
            flex: 1,
            backgroundColor: inputBackgroundColor,
            borderRadius: 5,
            padding: 10,
            color: baseTextColor,
          }}
          multiline={true}
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          value={formData.meetupPointDetail}
          onChangeText={(text) =>
            setFormData((previous) => {
              return {
                ...previous,
                meetupPointDetail: text,
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

export default MeetupPointDetail;
