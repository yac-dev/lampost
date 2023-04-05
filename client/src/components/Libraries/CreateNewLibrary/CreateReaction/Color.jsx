import React, { useContext } from 'react';
import CreateReactionContext from './CreateReactionContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const Color = () => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { accordion, setAccordion, creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 40 }}>
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
              backgroundColor: backgroundColorsTable['orange1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='color-palette-outline' size={25} color={iconColorsTable['orange1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Color</Text>
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
          <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
            Please choose a color for when the button is tapped.
          </Text>
          <View>
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'red1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'red1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'blue1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'blue1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'orange1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'orange1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'green1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'green1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'violet1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'violet1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'yellow1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'yellow1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'lightBlue1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'lightBlue1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'lightGreen1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'lightGreen1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
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
                onPress={() =>
                  setCreatingReaction((previous) => {
                    return {
                      ...previous,
                      color: 'pink1',
                    };
                  })
                }
              >
                {creatingReaction.color === 'pink1' ? (
                  <Ionicons name='checkmark-circle' size={15} color={'white'} />
                ) : null}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Color;
