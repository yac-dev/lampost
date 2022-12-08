import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { baseTextColor } from '../../utils/colorsTable';

const LoadingSpinner = (props) => {
  const { loading } = useContext(GlobalContext);
  return (
    <Spinner
      //visibility of Overlay Loading Spinner
      visible={loading}
      //Text with the Spinner
      textContent={'Processing now'}
      //Text style of the Spinner Text
      textStyle={{ color: baseTextColor }}
    />
  );
};

export default LoadingSpinner;
