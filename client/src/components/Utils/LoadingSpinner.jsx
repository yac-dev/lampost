import React, { useContext, useState } from 'react';
import GlobalContext from '../../GlobalContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { baseTextColor } from '../../utils/colorsTable';

const LoadingSpinner = (props) => {
  const { loading } = useContext(GlobalContext);

  return <Spinner visible={loading} textContent={props.textContent} textStyle={{ color: baseTextColor }} />;
};

export default LoadingSpinner;
