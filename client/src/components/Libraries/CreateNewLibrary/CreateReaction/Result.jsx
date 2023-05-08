import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import FastImage from 'react-native-fast-image';
import {
  backgroundColorsTable,
  baseTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;

const Result = () => {
  const { creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);
  const [exVotes, setExVotes] = useState(5);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 0.5 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>e.g.)</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: backgroundColorsTable['red1'],
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name='fire'
                size={30}
                color={iconColorsTable['red1']}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: iconColorsTable['red1'],
                  // marginRight: 5,
                  fontSize: 17,
                }}
              >
                Epic
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: backgroundColorsTable['orange1'],
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name='thumb-up'
                size={30}
                color={iconColorsTable['orange1']}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: iconColorsTable['orange1'],
                  // marginRight: 5,
                  fontSize: 17,
                }}
              >
                Nice photo
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: backgroundColorsTable['blue1'],
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/yao-ming-meme.png' }}
                style={{ width: 30, height: 30, marginRight: 5 }}
                tintColor={iconColorsTable['blue1']}
              />
              <Text
                style={{
                  color: iconColorsTable['blue1'],
                  // marginRight: 5,
                  fontSize: 17,
                }}
              >
                On my gosh
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: backgroundColorsTable['green1'],
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/meme-guy.png' }}
                style={{ width: 30, height: 30, marginRight: 5 }}
                tintColor={iconColorsTable['green1']}
              />
              <Text
                style={{
                  color: iconColorsTable['green1'],
                  // marginRight: 5,
                  fontSize: 17,
                }}
              >
                Wow...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flex: 0.5 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Preview</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                backgroundColor: backgroundColorsTable[creatingReaction.color],
              }}
            >
              {creatingReaction.icon ? (
                <FastImage
                  source={{ uri: creatingReaction.icon.url }}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                  tintColor={iconColorsTable[creatingReaction.color]}
                />
              ) : null}
              {creatingReaction.comment ? (
                <Text
                  style={{
                    color: iconColorsTable[creatingReaction.color],
                    marginRight: 5,
                    fontSize: 17,
                  }}
                >
                  {creatingReaction.comment}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Result;
