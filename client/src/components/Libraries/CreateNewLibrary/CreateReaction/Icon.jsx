import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import FormContext from '../FormContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  disabledTextColor,
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../apis/lampost';

const Icon = () => {
  const { accordion, setAccordion, creatingReaction, setCreatingReaction, navigation, route } =
    useContext(CreateReactionContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const [icons, setIcons] = useState([]);
  const [isIconsFetched, setIsIconFetched] = useState(false);

  // const getIcons = async () => {
  //   const result = await lampostAPI.get('/badges/icons');
  //   const { icons } = result.data;
  //   setIcons(() => {
  //     const datas = [];
  //     icons.forEach((icon) => datas.push(icon.Key));
  //     return datas;
  //   });
  //   setIsIconFetched(true);
  // };

  // useEffect(() => {
  //   getIcons();
  // }, []);

  useEffect(() => {
    if (route.params?.selectedIcon) {
      setCreatingReaction((previous) => {
        return {
          ...previous,
          icon: route.params.selectedIcon,
        };
      });
    }
  }, [route.params?.selectedIcon]);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                icon: !previous.icon,
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
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Icon</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  icon: !previous.icon,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.icon ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.icon ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>Please choose an icon.</Text>
            {/* <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'white',
              }}
            >
              <Text style={{ color: 'white' }}>Powered by icons8.com</Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('Icon picker')}
          >
            {creatingReaction.icon ? (
              <FastImage source={{ uri: creatingReaction.icon.url }} style={{ width: 40, height: 40 }} />
            ) : (
              <MaterialCommunityIcons name='plus' color={'black'} size={40} />
            )}
          </TouchableOpacity>
          {/* {isIconsFetched ? (
            <ScrollView contentContainerStyle={{ paddingBottom: 250 }} showsVerticalScrollIndicator={false}>
              {icons.map((icon, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setCreatingReaction((previous) => {
                        return {
                          ...previous,
                          icon: `https://lampost-dev.s3.us-east-2.amazonaws.com/${icon}`,
                        };
                      })
                    }
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 7,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: rnDefaultBackgroundColor,
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}
                      >
                        <FastImage
                          source={{ uri: `https://lampost-dev.s3.us-east-2.amazonaws.com/${icon}` }}
                          style={{ width: 30, height: 30, color: 'black' }}
                        />
                      </View>
                      <Text style={{ color: 'white', fontSize: 18 }}>
                        {icon.split('/').join(',').split('.').join(',').split(',')[1]}
                      </Text>
                    </View>
                    {creatingReaction.icon === `https://lampost-dev.s3.us-east-2.amazonaws.com/${icon}` ? (
                      <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null} */}
        </View>
      ) : null}
    </View>
  );
};

export default Icon;
