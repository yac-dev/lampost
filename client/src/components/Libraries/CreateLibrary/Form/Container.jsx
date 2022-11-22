import React, { useReducer, useContext } from 'react';
import RollsContext from '../../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../../apis/lampost';

import LibraryName from './LibraryName';
import LibraryBadges from './LibraryBadges';
import LibraryDescription from './LibraryDescription';

const INITIAL_STATE = {
  name: '',
  badges: [],
  description: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIBRARY_NAME':
      return { ...state, name: action.payload };
    case 'SET_LIBRARY_BADGES':
      return { ...state, badges: action.payload };
    case 'SET_LIBRARY_DESCRIPTION':
      return { ...state, description: action.payload };
    default:
      return { ...state };
  }
};

const Container = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { createLibraryBottomSheetRef, setLibraries } = useContext(RollsContext);

  const onSubmit = async () => {
    // const preferredBadgeIds = Object.values(state.preferredBadges).map((preferredBadge) => {
    //   return preferredBadge._id;
    // });

    const formData = {
      name: state.name,
      badges: state.badges,
      description: state.description,
      userId: props.auth.data._id,
    };

    const result = await lampostAPI.post('/libraries', formData);
    const { library } = result.data;
    createLibraryBottomSheetRef.current.close();
    setLibraries((previous) => [...previous, library]);
  };
  return (
    <View>
      <LibraryName state={state} dispatch={dispatch} />
      <LibraryBadges state={state} dispatch={dispatch} />
      <LibraryDescription state={state} dispatch={dispatch} />
      <TouchableOpacity onPress={() => onSubmit()}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
