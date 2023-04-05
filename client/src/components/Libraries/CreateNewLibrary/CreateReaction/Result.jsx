import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import FastImage from 'react-native-fast-image';
import {
  backgroundColorsTable,
  iconColorsTable,
  inputBackgroundColorNew,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';

const Result = () => {
  const { creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);

  return (
    <View style={{}}>
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Preview</Text>
      {creatingReaction.icon?.data && creatingReaction.comment && creatingReaction.color ? (
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>Just tap and try it!</Text>
      ) : null}

      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
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
              backgroundColor: creatingReaction.upvotes ? backgroundColorsTable[creatingReaction.color] : null,
            }}
          >
            {creatingReaction.icon?.data ? (
              <FastImage
                source={{ uri: creatingReaction.icon.data }}
                style={{ width: 35, height: 35, marginRight: 5 }}
                tintColor={creatingReaction.upvotes ? iconColorsTable[creatingReaction.color] : null}
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
        {creatingReaction.icon?.data && creatingReaction.comment && creatingReaction.color ? (
          <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold', fontSize: 17 }}>
            {creatingReaction.upvotes}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Result;
