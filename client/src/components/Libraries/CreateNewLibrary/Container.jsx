import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FormContext from './FormContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Title from './Title';
import Badges from './Badges';
import MediaType from './MediaType';
import Trust from './Trust';
import Reactions from './Reactions';
import Description from './Description';
import UploadContent from './UploadContent';
import Comment from './Comment';

const Container = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    badges: {},
    assetType: '',
    isTrustRequired: '',
    requiredTrust: '',
    isReactionAvailable: '',
    reactionOptions: [],
    isCommentAvailable: '',
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
          onPress={() => console.log(formData)}
          disabled={
            stageCleared.title &&
            stageCleared.badges &&
            stageCleared.assetType &&
            stageCleared.trust &&
            stageCleared.reaction &&
            stageCleared.comment &&
            stageCleared.description &&
            stageCleared.asset
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                stageCleared.title &&
                stageCleared.badges &&
                stageCleared.assetType &&
                stageCleared.trust &&
                stageCleared.reaction &&
                stageCleared.comment &&
                stageCleared.description &&
                stageCleared.asset
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
  }, [stageCleared]);

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
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>
          Recommended to fill out in order from top to bottom.{'\n'}
          Press "Done" when you finished↗️
        </Text>
        <ScrollView>
          <Title />
          <Badges />
          <MediaType />
          <Trust />
          <Reactions />
          <Comment />
          <UploadContent />
          <Description />
        </ScrollView>
        {/* <CreateReactionBottomSheet /> */}
      </KeyboardAvoidingView>
    </FormContext.Provider>
  );
};

export default Container;
