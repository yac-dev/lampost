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
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';

const Reactions = (props) => {
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
    route,
  } = useContext(FormContext);

  useEffect(() => {
    if (typeof formData.isReactionAvailable === 'boolean') {
      if (formData.isReactionAvailable) {
        if (formData.reactions.length) {
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
  }, [formData.isReactionAvailable, formData.reactions.length]);

  // [{iconType: 'emoji', emoji: '😎', comment: 'Cool'},
  //  {iconType: 'reactionIcon', reactionIcon: {url: '', name: ''}, comment:""}]
  // useEffect(() => {
  //   if (route.params?.reaction) {
  //     setFormData((previous) => {
  //       return {
  //         ...previous,
  //         reactions: [...previous.reactions, route.params.reaction],
  //       };
  //     });
  //   }
  // }, [route.params?.reaction]);

  useEffect(() => {
    if (route.params?.selectedEmoji) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [...previous.reactions, { iconType: 'emoji', emoji: route.params.selectedEmoji }],
        };
      });
    }
  }, [route.params?.selectedEmoji]);

  useEffect(() => {
    if (route.params?.selectedReactionIcon) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [
            ...previous.reactions,
            { iconType: 'reactionIcon', reactionIcon: route.params.selectedReactionIcon },
          ],
        };
      });
    }
  }, [route.params?.selectedReactionIcon]);

  useEffect(() => {
    if (route.params?.createdReactionIcon) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [
            ...previous.reactions,
            { iconType: 'reactionIcon', reactionIcon: route.params.createdReactionIcon },
          ],
        };
      });
    }
  }, [route.params?.createdReactionIcon]);

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

  console.log(formData);

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
    if (formData.reactions.length) {
      const list = formData.reactions.map((reaction, index) => {
        if (reaction.iconType === 'emoji') {
          return (
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: inputBackgroundColorNew,
                marginRight: 10,
              }}
              key={index}
            >
              <Text style={{ fontSize: 30 }}>{reaction.emoji}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['red1'],
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  right: -5,
                  top: -5,
                }}
                onPress={() => {
                  setFormData((previous) => {
                    const updating = { ...previous };
                    const removedOptions = updating.reactions;
                    removedOptions.splice(index, 1);
                    updating.reactions = removedOptions;
                    return updating;
                  });
                }}
              >
                <MaterialCommunityIcons name='minus' color={'white'} size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        } else if (reaction.iconType === 'reactionIcon') {
          return (
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: inputBackgroundColorNew,
                marginRight: 10,
              }}
              key={index}
            >
              <FastImage source={{ uri: reaction.reactionIcon.url }} style={{ width: 30, height: 30 }} />
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['red1'],
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  right: -5,
                  top: -5,
                }}
                onPress={() => {
                  setFormData((previous) => {
                    const updating = { ...previous };
                    const removedOptions = updating.reactions;
                    removedOptions.splice(index, 1);
                    updating.reactions = removedOptions;
                    return updating;
                  });
                }}
              >
                <MaterialCommunityIcons name='minus' color={'white'} size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }
      });

      return (
        <ScrollView horizontal={true} style={{ paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
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
              Allow people to react(❤️, 👍 etc) each content in this library?
            </Text>
          </View>
          <View style={{ width: '100%', padding: 5 }}>
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
                padding: 5,
                borderRadius: 5,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <MaterialCommunityIcons name='thumb-up' size={20} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Yes, allow</Text>
              </View>
            </TouchableOpacity>
            {renderCheckMarkForSure()}
          </View>
          <View style={{ width: '100%', padding: 5 }}>
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
                backgroundColor: iconColorsTable['blue1'],
                padding: 5,
                borderRadius: 5,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>No reaction</Text>
              </View>
              <Text style={{ color: baseTextColor, textAlign: 'center' }}>
                By turning off, you and members can enjoy snapshoots without any reactions.
              </Text>
            </TouchableOpacity>
            {renderCheckMarkForTurnedOff()}
          </View>
          {formData.isReactionAvailable ? (
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 13, color: baseTextColor }}>Please select at most 6 reaction options.</Text>
                <Text style={{ color: formData.reactions.length <= 6 ? baseTextColor : 'red', fontSize: 13 }}>
                  {formData.reactions.length}/6
                </Text>
              </View>
              {formData.reactions.length >= 6 ? null : (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 10 }}>
                  <View
                    style={{
                      flex: 0.5,
                    }}
                  >
                    <TouchableOpacity
                      style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5 }}
                      onPress={() => navigation.navigate('Emoji picker')}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 5 }}>
                        <MaterialCommunityIcons name='plus' color={'white'} size={20} style={{ marginRight: 5 }} />
                        <Text style={{ color: 'white' }}>Normal emoji</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: 'white', paddingLeft: 5, paddingRight: 5 }}>Or</Text>
                  <View
                    style={{
                      flex: 0.5,
                    }}
                  >
                    <TouchableOpacity
                      style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5 }}
                      onPress={() => navigation.navigate('Reaction icon picker')}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 5 }}>
                        <MaterialCommunityIcons name='plus' color={'white'} size={20} style={{ marginRight: 5 }} />
                        <Text style={{ color: 'white' }}>Special emoji</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {renderReactionOptions()}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Reactions;
