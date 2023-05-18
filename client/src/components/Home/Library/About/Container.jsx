import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';
import BadgeLabels from './BadgeLabels';
import FastImage from 'react-native-fast-image';

const About = (props) => {
  const renderReactions = () => {
    const list = props.route.params.library.reactions.map((reaction, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: rnDefaultBackgroundColor,
            borderRadius: 8,
            marginRight: 10,
          }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable[reaction.color],
              borderRadius: 8,
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FastImage
              source={{ uri: reaction.icon.url }}
              style={{ width: 45, height: 45, marginRight: 5 }}
              tintColor={iconColorsTable[reaction.color]}
            />
            <Text style={{ color: iconColorsTable[reaction.color], fontWeight: 'bold' }}>{reaction.comment}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View style={{ backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginBottom: 10 }}>
          {props.route.params.library.title}
        </Text>
        {props.route.params.library.isPublic ? null : (
          <Text style={{ marginBottom: 10, alignSelf: 'flex-end', color: baseTextColor }}>
            This is a private library
          </Text>
        )}
        <BadgeLabels library={props.route.params.library} />
        <Text style={{ color: 'white', marginBottom: 15 }}>{props.route.params.library.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginRight: 10,
            marginBottom: 15,
          }}
        >
          <FastImage
            source={{
              uri: props.route.params.library.launcher.photo
                ? props.route.params.library.launcher.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
            }}
            style={{
              width: 40,
              height: 40,
              backgroundColor: iconColorsTable['blue1'],
              marginRight: 10,
              borderRadius: 5,
            }}
            tintColor={props.route.params.library.launcher.photo ? null : 'white'}
          />
          <Text style={{ color: 'white' }}>{props.route.params.library.launcher.name}</Text>
        </View>
        {/* <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 17 }}>Available reactions</Text>
        {renderReactions()} */}
      </View>
    </SafeAreaView>
  );
};

export default About;
