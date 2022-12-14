import React, { useContext } from 'react';
import MapContext from '../../MeetupContext';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { baseTextColor } from '../../../../utils/colorsTable';

const Fee = (props) => {
  const { selectedMeetup } = useContext(MapContext);
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Fee</Text>
      {selectedMeetup.isFeeFree ? (
        <Text style={{ color: baseTextColor }}>It's free to attend this meetup. Feel free to join us!</Text>
      ) : (
        <Text style={{ color: baseTextColor }}>It's free to attend this meetup. Feel free to join us!</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Fee);
