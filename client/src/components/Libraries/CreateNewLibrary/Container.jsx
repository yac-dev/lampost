import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FormContext from './FormContext';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import Title from './Title';
import Badges from './Badges';
import MediaType from './MediaType';
import Trust from './Trust';
import Reactions from './Reactions';
import Description from './Description';
import CreateReactionBottomSheet from './CreateReactionBottomSheet';

const Container = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    badges: {},
    assetType: '',
    isRequiredTrust: '',
    requiredTrust: 0,
    isReactionAvailable: true,
    reactionOptions: [
      { icon: 'iconname', comment: 'lovely!!' }, // こんな感じだな
      { icon: 'iconname', comment: 'epic' },
    ],
    upvoteLimit: 1,
    isCommentAvailable: false,
    description: '',
    asset: null,
  });
  const [stageCleared, setStageCleared] = useState({
    title: false,
    badges: false,
    assetType: false,
    trust: false,
    reaction: false,
    comment: false,
    description: false,
    asset: false,
  });
  const [accordion, setAccordion] = useState({
    title: true,
    badges: false,
    assetType: false,
    trust: false,
    reaction: false,
    comment: false,
    description: false,
    asset: false,
  });
  const createReactionBottomSheetRef = useRef(null);
  const [creatingReaction, setCreatingReaction] = useState({ icon: null, comment: '', color: 'red1' });

  // iconからきたparamsを、creatingにセットしよう。
  useEffect(() => {}, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        stageCleared,
        setStageCleared,
        accordion,
        setAccordion,
        navigation: props.navigation,
        route: props.route,
        createReactionBottomSheetRef,
        creatingReaction,
        setCreatingReaction,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <ScrollView>
          <Title />
          <Badges />
          <MediaType />
          <Trust />
          <Reactions />
          {/* <Description /> */}
        </ScrollView>
        <CreateReactionBottomSheet />
      </View>
    </FormContext.Provider>
  );
};

export default Container;