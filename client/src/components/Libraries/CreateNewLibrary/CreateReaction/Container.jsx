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
  const [accordion, setAccordion] = useState({
    icon: false,
    color: false,
  });
  console.log(creatingReaction);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={creatingReaction.icon && creatingReaction.comment && creatingReaction.color ? false : true}
        >
          <Text
            style={{
              color:
                creatingReaction.icon &&
                creatingReaction.comment &&
                creatingReaction.comment.length <= 15 &&
                creatingReaction.color
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
  }, [creatingReaction]);
  const onDonePress = () => {
    props.navigation.navigate('Create new library', {
      reaction: { icon: creatingReaction.icon, comment: creatingReaction.comment, color: creatingReaction.color },
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
        <Color />
        <Result />
      </View>
    </CreateReactionContext.Provider>
  );
};

export default Container;
