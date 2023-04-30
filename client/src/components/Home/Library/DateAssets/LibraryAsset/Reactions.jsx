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

const Reactions = () => {
  const { auth } = useContext(GlobalContext);
  const { libraryAsset, libraryId } = useContext(LibraryAssetContext);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    setReactions(libraryAsset.reactions);
  }, []);

  const createReaction = async (reactionId) => {
    const result = await lampostAPI.post(`/libraryandassetrelationships/${libraryId}/${libraryAsset.asset._id}`, {
      reactionId,
      userId: auth.data._id,
    });
    setReactions((previous) => {
      const updating = [...previous];
      updating.forEach((reactionObject) => {
        if (reactionObject.reaction._id === reactionId) {
          reactionObject.upvoted++;
          reactionObject.users.push(auth.data._id);
        }
      });

      return updating;
    });
  };

  const renderReaction = useCallback((reactionObject) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          // width: 75,
          // height: 75,
          // backgroundColor: inputBackgroundColorNew,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: reactionObject.users.includes(auth.data._id)
              ? rnDefaultBackgroundColor
              : // : backgroundColorsTable[reactionObject.reaction.color],
                inputBackgroundColorNew,
            borderRadius: 8,
            // marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            borderWidth: reactionObject.users.includes(auth.data._id) ? 0.7 : null,
            borderColor: reactionObject.users.includes(auth.data._id)
              ? iconColorsTable[reactionObject.reaction.color]
              : null,
          }}
          // disabled={reactionObject.users.includes(auth.data._id) ? true : false}
          onPress={() => {
            createReaction(reactionObject.reaction._id);
            console.log('hello');
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: reactionObject.users.includes(auth.data._id)
                ? backgroundColorsTable[reactionObject.reaction.color]
                : inputBackgroundColorNew,
            }}
          >
            <FastImage
              source={{ uri: reactionObject.reaction.icon }}
              style={{ width: 30, height: 30 }}
              tintColor={
                reactionObject.users.includes(auth.data._id) ? iconColorsTable[reactionObject.reaction.color] : 'white'
              }
            />
          </View>
          <View
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              top: -9,
              right: -9,
              backgroundColor: reactionObject.users.includes(auth.data._id)
                ? iconColorsTable[reactionObject.reaction.color]
                : inputBackgroundColorNew,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>{reactionObject.users.length}</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 15 }}>{reactionObject.reaction.comment}</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <FlatList
        horizontal={true}
        data={reactions}
        renderItem={({ item }) => renderReaction(item)}
        keyExtractor={(item, index) => `${item._id}-${index}`}
      />
    </View>
  );
};

export default Reactions;
