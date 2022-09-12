// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';

const UserPage = (props) => {
  console.log('heeeey');
  return (
    <SafeAreaView>
      <Text>{props.auth.data.name.firstName}</Text>
      <Text>{props.auth.data.name.firstName}</Text>
      <Text>{props.auth.data.name.firstName}</Text>
      <Text>{props.auth.data.name.firstName}</Text>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserPage);
