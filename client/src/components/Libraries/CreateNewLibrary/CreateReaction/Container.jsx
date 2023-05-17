import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import { baseBackgroundColor, baseTextColor, screenSectionBackgroundColor } from '../../../../utils/colorsTable';
import Icon from './Icon';
import ShortComment from './ShortComment';
import Color from './Color';
import Result from './Result';

const Container = (props) => {
  const [creatingReaction, setCreatingReaction] = useState({ icon: null, comment: '', color: '', upvotes: 0 });
  const [iconType, setIconType] = useState('emoji');
  const [currentlySelectedTab, setCurrentlySelectedTab] = useState('emoji');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedReactionIcon, setSelectedReactionIcon] = useState(null);
  const [customedReactionIcon, setCustomedReactionIcon] = useState(null);
  const [comment, setComment] = useState('');
  const [accordion, setAccordion] = useState({
    icon: false,
    color: false,
  });
  console.log(creatingReaction);

  // emojiなら、selectedEmojiかつshort commentがあること。
  // reactionIconなら, selectedIconかつshort commentがあること。
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            (iconType === 'emoji' && selectedEmoji && comment && comment.length <= 15) ||
            (iconType === 'reactionIcon' && selectedReactionIcon && comment && comment.length <= 15)
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                (iconType === 'emoji' && selectedEmoji && comment && comment.length <= 15) ||
                (iconType === 'reactionIcon' && selectedReactionIcon && comment && comment.length <= 15)
                  ? 'white'
                  : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [iconType, selectedEmoji, selectedReactionIcon, comment]);

  const onDonePress = () => {
    const payload = {};
    if (iconType === 'emoji') {
      payload.iconType = 'emoji';
      payload.emoji = selectedEmoji;
      payload.comment = comment;
    } else if (iconType === 'reactionIcon') {
      payload.iconType = 'reactionIcon';
      payload.reactionIcon = selectedReactionIcon;
      payload.comment = comment;
    }
    props.navigation.navigate('Create new library', {
      reaction: payload,
    });
  };

  return (
    <CreateReactionContext.Provider
      value={{
        creatingReaction,
        setCreatingReaction,
        accordion,
        setAccordion,
        navigation: props.navigation,
        route: props.route,
        iconType,
        setIconType,
        currentlySelectedTab,
        setCurrentlySelectedTab,
        selectedEmoji,
        setSelectedEmoji,
        selectedReactionIcon,
        setSelectedReactionIcon,
        customedReactionIcon,
        setCustomedReactionIcon,
        comment,
        setComment,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', marginBottom: 15, color: 'white' }}>📣 Note</Text>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>
          In each library, we don't use traditional ❤️/👍 button to react each content. Instead, we use the original
          button which is created by the library creator(you). You can create it by combining an icon and a short
          comment. These are only applied to this library. Be creative and member-friendly!
        </Text>
        <Icon />
        <ShortComment />
        {/* <Color /> */}
        <Result />
      </View>
    </CreateReactionContext.Provider>
  );
};

export default Container;
