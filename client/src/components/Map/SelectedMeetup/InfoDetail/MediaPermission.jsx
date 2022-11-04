import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const MediaPermission = (props) => {
  return (
    <View>
      {props.selectedMeetup.isMediaAllowed ? (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Allowed 👍</Text>
          <Text style={{ fontSize: 15 }}>You can take photos, videos and start live during this meetup.</Text>
          <Text style={{ fontSize: 15 }}>
            You can launch camera app from bottom tab and let's share your special memories!
          </Text>
        </View>
      ) : (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Not allowed 👍</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            You cannot take any photos, videos or start live during this meetup...
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(MediaPermission);
