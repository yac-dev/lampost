// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import Overview from './Overview';
import Description from './Description';

const Container = (props) => {
  switch (props.component) {
    case 'overview':
      return <Overview />;
    case 'description':
      return <Description />;
    default:
      return null;
  }
};

export default Container;
