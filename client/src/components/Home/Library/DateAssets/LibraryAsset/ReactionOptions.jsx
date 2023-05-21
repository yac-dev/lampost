import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import GlobalContext from '../../../../../GlobalContext';
import LibraryAssetContext from './LibraryAssetContext';
import {
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
} from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../../apis/lampost';

const Reactions = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { libraryAsset, libraryId, reactionOptions, isCommentAvailable, reactions, setReactions } =
    useContext(LibraryAssetContext);
  const [commentTextInput, setCommentTextInput] = useState('');

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
  console.log(reactionOptions);

  const renderReactionOption = (reactionObject) => {
    if (reactionObject) {
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
    } else {
      return null;
    }
  };

  const onCommentDone = async (index) => {
    setCommentTextInput('');
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
    // 最終的に、commentを隠すようになる。
    // 自分のuserIdで探して、それにcommnetを付与する感じか。
    setLoading(true);
    const result = await lampostAPI.post(
      `/libraryandassetrelationships/${libraryId}/${libraryAsset.asset._id}/comment`,
      {
        userId: auth.data._id,
        comment: commentTextInput.replace(emojiRegex, ''), // emojiは全て消す。
      }
    );
    setLoading(false);
    setReactions((previous) => {
      const updating = [...previous];
      updating[index].comment = commentTextInput;
      return updating;
    });
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your comment has been sent successfully.',
      duration: 5000,
    });
  };

  const renderReactionOptions = () => {
    for (let i = 0; i < reactions.length; i++) {
      if (reactions[i].user._id === auth.data._id) {
        if (isCommentAvailable) {
          if (reactions[i].comment) {
            return null;
          } else {
            return (
              <View
                style={{ width: '100%', paddingLeft: 5, paddingRight: 5, flexDirection: 'row', alignItems: 'center' }}
              >
                <TextInput
                  placeholder='Leave a comment?'
                  placeholderTextColor={baseTextColor}
                  value={commentTextInput}
                  onChangeText={(text) => setCommentTextInput(text)}
                  keyboardType='default'
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: inputBackgroundColorNew,
                    marginRight: 5,
                    color: 'white',
                  }}
                />
                <TouchableOpacity
                  disabled={commentTextInput ? false : true}
                  style={{
                    backgroundColor: commentTextInput ? iconColorsTable['blue1'] : inputBackgroundColorNew,
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    onCommentDone(i);
                  }}
                >
                  <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
              </View>
            );
          }
        } else {
          return null;
        }
      }
    }
    return (
      <FlatList
        horizontal={true}
        data={reactionOptions}
        renderItem={({ item }) => renderReactionOption(item)}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        style={{ marginLeft: 10 }}
      />
    );
    // if (reactions.some((reactionObject) => reactionObject.user._id === auth.data._id)) {
    //   // ここに、commentがなければ、textinputを、あれば、何も表示しない。
    //   return null;
    // } else {
    //   return (
    //     <FlatList
    //       horizontal={true}
    //       data={reactionOptions}
    //       renderItem={({ item }) => renderReactionOption(item)}
    //       keyExtractor={(item, index) => `${item._id}-${index}`}
    //       style={{ marginLeft: 10 }}
    //     />
    //   );
    // }
  };

  return renderReactionOptions();
};

export default Reactions;
