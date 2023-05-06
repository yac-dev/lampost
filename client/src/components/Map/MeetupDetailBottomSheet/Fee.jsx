import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MeetupContext from '../MeetupContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons, Foundation } = iconsTable;

const Fee = () => {
  const { selectedMeetup } = useContext(MeetupContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <View style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setIsAccordionOpen((previous) => !previous)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['yellow1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Foundation name='dollar-bill' size={20} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Fee</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor, fontSize: 15 }}>
            {selectedMeetup.isFeeFree ? "It's free" : `$${selectedMeetup.fee}`}
          </Text>
          <TouchableOpacity onPress={() => setIsAccordionOpen((previous) => !previous)}>
            <MaterialCommunityIcons
              name={isAccordionOpen ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isAccordionOpen ? (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {selectedMeetup.isFeeFree ? "It's free to join this meetup." : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Fee;

{
  /* <Text style={{ color: baseTextColor, fontSize: 15 }}>
            {selectedMeetup.isFeeFree ? "It's free" : `$${selectedMeetup.fee}`}
          </Text> */
}
