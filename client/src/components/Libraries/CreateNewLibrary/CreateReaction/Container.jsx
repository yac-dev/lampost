import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
import Icon from './Icon';
import ShortComment from './ShortComment';
import Color from './Color';
import Result from './Result';

const Container = () => {
  const [creatingReaction, setCreatingReaction] = useState({ icon: null, comment: '', color: '', upvotes: 0 });
  const [accordion, setAccordion] = useState({
    icon: false,
    color: false,
  });

  return (
    <CreateReactionContext.Provider value={{ creatingReaction, setCreatingReaction, accordion, setAccordion }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Icon />
        <ShortComment />
        <Color />
        <Result />
      </View>
    </CreateReactionContext.Provider>
  );
};

export default Container;
