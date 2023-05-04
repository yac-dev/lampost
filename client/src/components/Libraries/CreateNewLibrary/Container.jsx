import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Title from './Title';
import Badges from './Badges';
import MediaType from './MediaType';
import Public from './Public';
import Trust from './Trust';
import Reactions from './Reactions';
import Description from './Description';
import UploadContent from './UploadContent';
import Comment from './Comment';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const Container = (props) => {
  const { auth, setAuth, setLoading, setMyJoinedLibraries } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: '',
    badges: {},
    assetType: '',
    isPublic: '',
    friends: {},
    invitationMessage: '',
    isReactionAvailable: '',
    reactions: [],
    isCommentAvailable: '',
    asset: null,
    description: '',
  });
  const [stageCleared, setStageCleared] = useState({
    title: false,
    badges: false,
    assetType: false,
    // trust: false,
    public: false,
    reaction: false,
    comment: false,
    description: false,
    asset: false,
  });
  const [accordion, setAccordion] = useState({
    title: true,
    badges: false,
    assetType: false,
    // trust: false,
    public: false,
    reaction: false,
    comment: false,
    description: false,
    asset: false,
  });

  const onDonePress = async () => {
    const payload = {
      title: formData.title,
      badgeIds: Object.keys(formData.badges),
      assetType: formData.assetType,
      isPublic: formData.isPublic,
      friendIds: Object.values(formData.friends).map((friendRelationship) => friendRelationship.friend._id),
      invitationMessage: formData.invitationMessage,
      isReactionAvailable: formData.isReactionAvailable,
      reactions: formData.reactions,
      isCommentAvailable: formData.isCommentAvailable,
      asset: {
        _id: formData.asset._id,
        data: formData.asset.data,
        type: formData.asset.type,
      },
      launcher: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      description: formData.description,
    };
    setLoading(true);
    const result = await lampostAPI.post(`/libraries`, payload);
    setLoading(false);
    const { library } = result.data;
    props.navigation.navigate('Libraries', { fromComponent: 'Create new library', library });
    setMyJoinedLibraries((previous) => [...previous, library]);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            stageCleared.title &&
            stageCleared.badges &&
            stageCleared.assetType &&
            stageCleared.public &&
            // stageCleared.trust &&
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
                stageCleared.public &&
                // stageCleared.trust &&
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
          reactions: [...previous.reactions, props.route.params.reaction],
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
      }}
    >
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        {/* <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>Press "Done" when you finish&nbsp;↗️</Text> */}
        <ScrollView>
          <Title />
          <Badges />
          <MediaType />
          <Public />
          {/* <Trust /> */}
          <Reactions />
          <Comment />
          <UploadContent />
          <Description />
        </ScrollView>
        <LoadingSpinner />
      </KeyboardAvoidingView>
    </FormContext.Provider>
  );
};

export default Container;
