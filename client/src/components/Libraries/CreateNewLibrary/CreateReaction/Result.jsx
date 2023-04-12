import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import FastImage from 'react-native-fast-image';
import {
  backgroundColorsTable,
  baseTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';

const Result = () => {
  const { creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);
  const [exVotes, setExVotes] = useState(5);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 0.5 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>e.g.)</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: rnDefaultBackgroundColor,
              marginRight: 8,
              width: 40,
              height: 40,
              borderWidth: 0.7,
              borderColor: iconColorsTable['yellow1'],
            }}
            onPress={() => setExVotes((previous) => previous + 1)}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: backgroundColorsTable['yellow1'],
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.7,
                borderColor: iconColorsTable['yellow1'],
              }}
            >
              <FastImage
                source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/icons/a-hand-thumbs-up.png' }}
                style={{ width: 30, height: 30 }}
                tintColor={iconColorsTable['yellow1']}
              />
            </View>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: iconColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -9,
                right: -9,
              }}
            >
              <Text style={{ color: 'white', fontSize: 15 }}>{exVotes}</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              marginRight: 5,
              fontSize: 17,
            }}
          >
            Nice photo
          </Text>
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Preview&nbsp;&nbsp;
          {creatingReaction.icon && creatingReaction.comment && creatingReaction.color ? (
            <Text style={{ color: baseTextColor, fontSize: 12 }}>Tap to try demo</Text>
          ) : null}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: creatingReaction.upvotes ? rnDefaultBackgroundColor : inputBackgroundColorNew,
              marginRight: 8,
            }}
            onPress={() =>
              setCreatingReaction((previous) => {
                return {
                  ...previous,
                  upvotes: previous.upvotes + 1,
                };
              })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                backgroundColor: creatingReaction.upvotes ? backgroundColorsTable[creatingReaction.color] : null,
              }}
            >
              {creatingReaction.icon ? (
                <FastImage
                  source={{ uri: creatingReaction.icon }}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                  tintColor={creatingReaction.upvotes ? iconColorsTable[creatingReaction.color] : 'white'}
                />
              ) : null}
              {creatingReaction.comment ? (
                <Text
                  style={{
                    color: creatingReaction.upvotes ? iconColorsTable[creatingReaction.color] : 'white',
                    marginRight: 5,
                    fontSize: 17,
                  }}
                >
                  {creatingReaction.comment}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          {creatingReaction.icon && creatingReaction.comment && creatingReaction.color ? (
            <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold', fontSize: 17 }}>
              {creatingReaction.upvotes}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Result;
