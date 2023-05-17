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
    setReactions((previous) => {
      const updating = [...previous];
      if (reactionObject.iconType === 'emoji') {
        updating.push({
          reaction: { iconType: 'emoji', emoji: reactionObject.emoji },
          user: { _id: auth.data._id, photo: auth.data.photo },
        });
        return updating;
      } else if (reactionObject.iconType === 'reactionIcon') {
        updating.push({
          reaction: { iconType: 'reactionIcon', reactionIcon: { url: reactionObject.reactionIcon.url } },
          user: { _id: auth.data._id, photo: auth.data.photo },
        });
        return updating;
      }
    });
  };

  const renderReactionOption = (reactionObject) => {
    if (reactionObject.iconType === 'emoji') {
      return (
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: inputBackgroundColorNew,
            marginRight: 10,
          }}
          onPress={() => createReaction(reactionObject)}
        >
          <Text style={{ fontSize: 30 }}>{reactionObject.emoji}</Text>
        </TouchableOpacity>
      );
    } else if (reactionObject.iconType === 'reactionIcon') {
      return (
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: inputBackgroundColorNew,
            marginRight: 10,
          }}
          onPress={() => createReaction(reactionObject)}
        >
          <FastImage source={{ uri: reactionObject.reactionIcon.url }} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      );
    }
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
