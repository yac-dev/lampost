// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';

const UserPage = (props) => {
  // const render = () => {
  //   if (props.auth.isAuthenticated) {
  //     return (
  //       <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
  //         <Text>{props.auth.data.name}</Text>
  //       </SafeAreaView>
  //     );
  //   } else {
  //     return (
  //       <View>
  //         <Text>Nooooo data</Text>
  //       </View>
  //     );
  //   }
  // };
  if (props.auth.isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <Text>{props.auth.data.name}</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text>Nooooo data</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserPage);
