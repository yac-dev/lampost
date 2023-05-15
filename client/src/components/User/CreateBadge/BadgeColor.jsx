import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
const { MaterialCommunityIcons, Ionicons } = iconsTable;

const BadgeColor = () => {
  const { accordion, setAccordion, badgeColor, setBadgeColor } = useContext(FormContext);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                color: !previous.color,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['pink1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='color-palette' size={25} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Badge color</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  color: !previous.color,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.color ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.color ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', color: baseTextColor, marginBottom: 10 }}>Please select the badge color.</Text>
          <View style={{ marginBottom: 20 }}>
            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['red1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('red1')}
              >
                {badgeColor === 'red1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('blue1')}
              >
                {badgeColor === 'blue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['orange1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('orange1')}
              >
                {badgeColor === 'orange1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['green1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('green1')}
              >
                {badgeColor === 'green1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['violet1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('violet1')}
              >
                {badgeColor === 'violet1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['yellow1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('yellow1')}
              >
                {badgeColor === 'yellow1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['lightBlue1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('lightBlue1')}
              >
                {badgeColor === 'lightBlue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['lightGreen1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('lightGreen1')}
              >
                {badgeColor === 'lightGreen1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['pink1'],
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setBadgeColor('pink1')}
              >
                {badgeColor === 'pink1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default BadgeColor;
