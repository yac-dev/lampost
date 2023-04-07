import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import FormContext from './FormContext';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';

const Title = () => {
  const { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons, Foundation } = iconsTable;
  const {
    formData,
    setFormData,
    stageCleared,
    setStageCleared,
    accordion,
    setAccordion,
    createReactionBottomSheetRef,
    navigation,
  } = useContext(FormContext);

  useEffect(() => {
    if (typeof formData.isReactionAvailable === 'boolean') {
      if (formData.isReactionAvailable) {
        if (formData.reactionOptions.length) {
          setStageCleared((previous) => {
            return {
              ...previous,
              reaction: true,
            };
          });
        } else {
          setStageCleared((previous) => {
            return {
              ...previous,
              reaction: false,
            };
          });
        }
      } else {
        setStageCleared((previous) => {
          return {
            ...previous,
            reaction: true,
          };
        });
      }
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          reaction: false,
        };
      });
    }
  }, [formData.isReactionAvailable, formData]);

  // <View>
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //           <View>
  //
  //           </View>
  //         </View>
  //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  //           <Text style={{ fontSize: 13, color: baseTextColor, marginRight: 20 }}>
  //             People allowed to like each photo/video?
  //           </Text>
  //         </View>
  //       </View>

  const renderCheckMarkForSure = () => {
    if (typeof formData.isReactionAvailable === 'boolean') {
      if (formData.isReactionAvailable) {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const renderCheckMarkForTurnedOff = () => {
    if (typeof formData.isReactionAvailable === 'boolean') {
      if (formData.isReactionAvailable) {
        return null;
      } else {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      }
    } else {
      return null;
    }
  };

  const renderReactionOptions = () => {
    if (formData.reactionOptions.length) {
      const list = formData.reactionOptions.map((reaction, index) => {
        return (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}
            key={index}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: inputBackgroundColorNew,
                borderRadius: 5,
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={{ uri: reaction.icon }}
                style={{ width: 30, height: 30, marginRight: 5 }}
                tintColor={'white'}
              />
              <Text style={{ color: 'white' }}>{reaction.comment}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['red1'],
                padding: 10,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setFormData((previous) => {
                  const updating = { ...previous };
                  const removedOptions = updating.reactionOptions;
                  removedOptions.splice(index, 1);
                  updating.reactionOptions = removedOptions;
                  return updating;
                });
                console.log('remove');
              }}
            >
              <MaterialCommunityIcons name='minus' color={'white'} size={20} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return null;
    }
  };

  const renderReactionOptionsLength = () => {
    if (formData.reactionOptions.length <= 3) {
      return <Text style={{ color: baseTextColor, fontSize: 13 }}>{formData.reactionOptions}/3</Text>;
    } else {
      return <Text style={{ color: 'red', fontSize: 13 }}>{formData.reactionOptions}/3</Text>;
    }
  };

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                reaction: !previous.reaction,
              };
            })
          }
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
            <MaterialCommunityIcons name='thumb-up' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Reaction</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.reaction ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  reaction: !previous.reaction,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.reaction ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.reaction ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Allow people to like/upvote contents of this library?
            </Text>
            {/* <TouchableOpacity
              onPress={() => {
                console.log('hello');
              }}
            >
              <Ionicons name='help-circle' size={20} color={iconColorsTable['yellow1']} />
            </TouchableOpacity> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: true,
                    };
                  });
                }}
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='thumb-up' size={20} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Yes, allow</Text>
              </TouchableOpacity>
              {renderCheckMarkForSure()}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: false,
                    };
                  });
                }}
                style={{
                  backgroundColor: iconColorsTable['red1'],
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Foundation name='prohibited' size={20} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>No, disable</Text>
              </TouchableOpacity>
              {renderCheckMarkForTurnedOff()}
            </View>
          </View>
          {formData.isReactionAvailable ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 13, color: baseTextColor }}>
                  Now, please create your original like buttons.
                </Text>
                <Text style={{ color: formData.reactionOptions.length <= 3 ? baseTextColor : 'red', fontSize: 13 }}>
                  {formData.reactionOptions.length}/3
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: iconColorsTable['blue1'],
                  padding: 10,
                  borderRadius: 5,
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onPress={() => navigation.navigate('Create reaction')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons name='plus' color={'white'} size={20} style={{ marginRight: 5 }} />
                  <Text style={{ color: 'white' }}>{formData.reactionOptions.length ? 'Add more' : 'Add'}</Text>
                </View>
              </TouchableOpacity>
              {renderReactionOptions()}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Title;
