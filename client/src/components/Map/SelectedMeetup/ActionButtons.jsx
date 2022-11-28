// main libraries
import React, { useState } from 'react';
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
  const renderApp = () => {
    if (props.auth.isAuthenticated) {
      for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
        // everyか？
        if (props.auth.data.upcomingMeetups[i].meetup === props.selectedMeetup._id) {
          return (
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              {props.selectedMeetup.launcher._id === props.auth.data._id ? (
                <Button
                  mode='outlined'
                  // buttonColor='#2DB437'
                  icon={'plus'}
                  style={{ marginRight: 10 }}
                  onPress={() => console.log('edit')}
                >
                  Scout
                </Button>
              ) : (
                // <Button
                //   mode='outlined'
                //   // buttonColor='#2DB437'
                //   icon={'exit-run'}
                //   onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
                //   style={{ marginRight: 10 }}
                // >
                //   Leave
                // </Button>
                <ActionButton
                  label='Leave'
                  icon={
                    <MaterialCommunityIcons name='human-greeting-variant' size={25} color={iconColorsTable['red1']} />
                  }
                  backgroundColor={backgroundColorsTable['red1']}
                  onActionButtonPress={() => console.log('pressing')}
                />
              )}
              <Button
                mode='outlined'
                // buttonColor='#2DB437'
                icon={'comment-text-multiple'}
                onPress={() => props.navigation.navigate('Lounge', { meetupId: props.selectedMeetup._id })}
                style={{ marginRight: 10 }}
              >
                Lounge
              </Button>
              <Button
                mode='outlined'
                // buttonColor='#2DB437'
                icon={'camera'}
                onPress={() => props.navigation.navigate('Camera', { meetupId: props.selectedMeetup._id })}
                style={{ marginRight: 10 }}
              >
                Camera
              </Button>
              {/* <Button mode='outlined' icon={'web'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
                Location detail
              </Button> */}
              <Button
                mode='outlined'
                // buttonColor='#2DB437'
                icon={'map'}
                onPress={() => console.log('edit')}
                style={{ marginRight: 10 }}
              >
                Map chat
              </Button>
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
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
