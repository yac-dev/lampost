import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../../utils/colorsTable';
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
    <CreateReactionContext.Provider value={{ creatingReaction, setCreatingReaction, accordion, setAccordion }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', marginBottom: 15, color: 'white' }}>Heads up</Text>
        <Text style={{ color: 'white', marginBottom: 10 }}>
          On each library, we don't use traditional ❤️/👍 button to like each content. Instead, we use the like buttons
          which are created by the library creator(you). You can make multiple original buttons (up to 3) and these are
          only applied to this library. Be creative and member-friendly!
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