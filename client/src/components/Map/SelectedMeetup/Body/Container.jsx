// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import About from './About';
import Description from './Description';

const Container = (props) => {
  switch (props.component) {
    case 'about':
      return <About />;
    case 'description':
      return <Description />;
    default:
      return null;
  }
};

export default Container;
