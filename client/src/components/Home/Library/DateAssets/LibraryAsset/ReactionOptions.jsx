import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../../GlobalContext';
import LibraryAssetContext from './LibraryAssetContext';
import {
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../../apis/lampost';

const Reactions = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const { libraryAsset, libraryId, reactionOptions, reactions, setReactions } = useContext(LibraryAssetContext);

  console.log(reactionOptions);
  const createReaction = async (reactionObject) => {
    setLoading(true);
    const result = await lampostAPI.post(`/libraryandassetrelationships/${libraryId}/${libraryAsset.asset._id}`, {
      reactionId: reactionObject._id,
      userId: auth.data._id,
    });
    setLoading(false);
    setReactions((previous) => [
      ...previous,
      {
        reaction: { icon: reactionObject.icon, color: reactionObject.color },
        user: { _id: auth.data._id, photo: auth.data.photo },
      },
    ]);
  };

  const renderReactionOption = (reactionObject) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: rnDefaultBackgroundColor,
          marginRight: 15,
          borderRadius: 8,
        }}
        onPress={() => createReaction(reactionObject)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: backgroundColorsTable[reactionObject.color],
            borderRadius: 5,
            padding: 5,
          }}
        >
          <FastImage
            source={{ uri: reactionObject.icon.url }}
            style={{ width: 35, height: 35, marginRight: 5 }}
            tintColor={iconColorsTable[reactionObject.color]}
          />
          <Text style={{ color: 'white', fontSize: 15, color: iconColorsTable[reactionObject.color] }}>
            {reactionObject.comment}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReactionOptions = () => {
    if (reactions.some((reactionObject) => reactionObject.user._id === auth.data._id)) {
      return null;
    } else {
      return (
        <FlatList
          horizontal={true}
          data={reactionOptions}
          renderItem={({ item }) => renderReactionOption(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          style={{ marginLeft: 10 }}
        />
      );
    }
  };

  return renderReactionOptions();
};

export default Reactions;
