import React, { useContext } from 'react';
import MapContext from '../../MeetupContext';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { baseTextColor } from '../../../../utils/colorsTable';

const MediaPermission = (props) => {
  const { selectedMeetup } = useContext(MapContext);
  return (
    <View>
      {selectedMeetup.isMediaAllowed ? (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Allowed 👍</Text>
          <Text style={{ fontSize: 15, color: baseTextColor }}>
            You can take photos, videos and start live during this meetup.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Not allowed</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: baseTextColor }}>
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
