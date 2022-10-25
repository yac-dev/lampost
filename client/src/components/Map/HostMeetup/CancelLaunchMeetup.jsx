// main libraries
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// ac
import { setIsHostMeetupOpen } from '../../../redux/actionCreators/hostMeetup';

const CancelHostMeetupButton = (props) => {
  // if (props.hostMeetup.isOpen) {
  //   return (
  //     <TouchableOpacity
  //       style={{ position: 'absolute', top: 50, left: 50 }}
  //       onPress={() => props.setIsHostMeetupOpen(false)}
  //     >
  //       <View>
  //         <Text>Cancel button here</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // } else {
  //   return null;
  // }
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Are you sure you want to cancel launching?</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { setIsHostMeetupOpen })(CancelHostMeetupButton);
