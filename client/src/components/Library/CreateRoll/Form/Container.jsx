import React, { useReducer, useContext } from 'react';
import RollsContext from '../../RollsContext';
import { View, Text, TouchableOpacity } from 'react-native';

import RollName from './RollName';
import RollBadges from './RollBadges';
import RollDescription from './RollDescription';

const INITIAL_STATE = {
  name: '',
  badges: [],
  description: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLL_NAME':
      return { ...state, name: action.payload };
    case 'SET_ROLL_BADGES':
      return { ...state, badges: action.payload };
    case 'SET_ROLL_DESCRIPTION':
      return { ...state, description: action.payload };
    default:
      return { ...state };
  }
};

const Container = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { closeCreateRollBottomSheet } = useContext(RollsContext);

  const onSubmit = () => {
    const preferredBadgeIds = Object.values(state.preferredBadges).map((preferredBadge) => {
      return preferredBadge._id;
    });

    const formData = {
      name: state.name,
      badges: state.badges,
      description: state.description,
      launcher: props.auth.data._id,
    };
    console.log(formData);
  };
  return (
    <View>
      <Text>Form here!</Text>
      <RollName state={state} dispatch={dispatch} />
      <RollBadges state={state} dispatch={dispatch} />
      <RollDescription state={state} dispatch={dispatch} />
      <TouchableOpacity onPress={() => closeCreateRollBottomSheet()}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Container;
