import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FormContext from './FormContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Title from './Title';
import Badges from './Badges';
import MediaType from './MediaType';
import Trust from './Trust';
import Reactions from './Reactions';
import Description from './Description';
import UploadContent from './UploadContent';

const Container = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    badges: {},
    assetType: '',
    isTrustRequired: '',
    requiredTrust: '',
    isReactionAvailable: '',
    reactionOptions: [],
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

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        // onPress={() => onDonePress()}
        // disabled={true}
        >
          <Text
            style={{
              color: screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  useEffect(() => {
    if (props.route.params?.reaction) {
      setFormData((previous) => {
        return {
          ...previous,
          reactionOptions: [...previous.reactionOptions, props.route.params.reaction],
        };
      });
    }
  }, [props.route.params?.reaction]);

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
        <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>
          Recommended to fill out in order from top to bottom👍
        </Text>
        <ScrollView>
          <Title />
          <Badges />
          <MediaType />
          <Trust />
          <Reactions />
          {/* <Description /> */}
          <UploadContent />
        </ScrollView>
        {/* <CreateReactionBottomSheet /> */}
      </View>
    </FormContext.Provider>
  );
};

export default Container;
