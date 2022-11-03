import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const MediaPermission = (props) => {
  return (
    <View>
      {props.selectedMeetup.isMediaAllowed ? (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            It is allowed to take photos, videos and start live 👍
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            You can launch camera app from bottom tab and let's share your special moment!
          </Text>
        </View>
      ) : (
        <Text>It is NOT allowed to take photos, videos and start live...</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(MediaPermission);
