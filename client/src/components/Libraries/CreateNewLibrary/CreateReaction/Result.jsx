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
              backgroundColor: inputBackgroundColorNew,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              padding: 7,
            }}
          >
            <Text style={{ fontSize: 23, marginRight: 5 }}>😆</Text>
            <Text style={{ color: 'white' }}>Nice photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: inputBackgroundColorNew,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              padding: 7,
            }}
          >
            <Text style={{ fontSize: 23, marginRight: 5 }}>👍</Text>
            <Text style={{ color: 'white' }}>Wel done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: inputBackgroundColorNew,
              alignSelf: 'flex-start',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 7,
            }}
          >
            <FastImage
              source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/reactionIcons/elon-wtf.png' }}
              style={{ width: 30, height: 30, marginRight: 5 }}
            />
            <Text
              style={{
                color: 'white',
                // marginRight: 5,
                fontSize: 17,
              }}
            >
              Wow...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: inputBackgroundColorNew,
              alignSelf: 'flex-start',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 7,
            }}
          >
            <FastImage
              source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/reactionIcons/oh-meme-guy.png' }}
              style={{ width: 30, height: 30, marginRight: 5 }}
            />
            <Text
              style={{
                color: 'white',
                // marginRight: 5,
                fontSize: 17,
              }}
            >
              Oh...
            </Text>
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
