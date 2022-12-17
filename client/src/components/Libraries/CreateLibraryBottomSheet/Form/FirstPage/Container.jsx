import React, { useReducer, useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import LibrariesContext from '../../../LibrariesContext';
import FormContext from '../../FormContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../../../apis/lampost';

import LibraryName from './LibraryName';
import LibraryBadges from './LibraryBadges';
import LibraryDescription from './LibraryDescription';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

const INITIAL_STATE = {
  name: '',
  badges: {},
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
  const { auth } = useContext(GlobalContext);
  const { createLibraryBottomSheetRef, setLibraries } = useContext(LibrariesContext);
  const { setPage } = useContext(FormContext);

  const onSubmit = async () => {
    // const preferredBadgeIds = Object.values(state.preferredBadges).map((preferredBadge) => {
    //   return preferredBadge._id;
    // });

    const formData = {
      name: state.name,
      badges: state.badges,
      description: state.description,
      userId: auth.data._id,
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
      {/* <LibraryDescription state={state} dispatch={dispatch} /> */}
      <View style={{ alignSelf: 'center' }}>
        <ActionButton
          label='Next'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
          onActionButtonPress={() => setPage('SECOND_PAGE')}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
