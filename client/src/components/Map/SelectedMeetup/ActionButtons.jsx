// main libraries
import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';
import ActionButton from '../../Utils/ActionButton';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const ActionButtons = (props) => {
  const { selectedMeetup, navigation } = useContext(MapContext);

  const renderApp = () => {
    if (props.auth.isAuthenticated) {
      for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
        // everyか？
        if (props.auth.data.upcomingMeetups[i].meetup._id === selectedMeetup._id) {
          return (
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              {selectedMeetup.launcher._id === props.auth.data._id ? (
                <ActionButton
                  label='Edit my meetup'
                  icon={
                    <MaterialCommunityIcons
                      name='file-document-edit-outline'
                      size={25}
                      color={iconColorsTable['blue1']}
                    />
                  }
                  backgroundColor={backgroundColorsTable['blue1']}
                  onActionButtonPress={() => console.log('edit  my meetup')}
                />
              ) : (
                <ActionButton
                  label='Leave'
                  icon={
                    <MaterialCommunityIcons name='human-greeting-variant' size={25} color={iconColorsTable['red1']} />
                  }
                  backgroundColor={backgroundColorsTable['red1']}
                  onActionButtonPress={() => props.leaveMeetup(selectedMeetup._id)}
                />
              )}
              <ActionButton
                label='Go to lounge'
                icon={
                  <MaterialCommunityIcons name='comment-text-multiple' size={25} color={iconColorsTable['blue1']} />
                }
                backgroundColor={backgroundColorsTable['blue1']}
                onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
              />
              <ActionButton
                label='Launch camera'
                icon={<MaterialCommunityIcons name='camera' size={25} color={iconColorsTable['blue1']} />}
                backgroundColor={backgroundColorsTable['blue1']}
                onActionButtonPress={() => console.log('pressing')}
              />
              <ActionButton
                label='Invite people'
                icon={<MaterialCommunityIcons name='plus' size={25} color={iconColorsTable['blue1']} />}
                backgroundColor={backgroundColorsTable['blue1']}
                onActionButtonPress={() => console.log('pressing')}
              />
            </View>
          );
        }
      }
      return (
        <View style={{}}>
          <ActionButton
            label='Join this meetup'
            icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={iconColorsTable['blue1']} />}
            backgroundColor={backgroundColorsTable['blue1']}
            onActionButtonPress={() => console.log('pressing')}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView horizontal={true} style={{ marginBottom: 25 }}>
      {renderApp()}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
