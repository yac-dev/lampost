import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { iconColorsTable } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CameraPermission = (props) => {
  const renderSwitchState = () => {
    if (props.state.isMediaAllowed) {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>Yes</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>No</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1, marginBottom: 10 }}>
        Do you allow the attendees to take photos or videos during the meetup?
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={props.state.isMediaAllowed}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEDIA_ALLOWED', payload: '' })}
          style={{ marginRight: 10 }}
        />
        {renderSwitchState()}
      </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['lightBlue1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='photo-video' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Media permission</Text>
            <Switch
              value={props.state.isMediaAllowed}
              onValueChange={() => props.dispatch({ type: 'SET_IS_MEDIA_ALLOWED', payload: '' })}
              style={{ marginRight: 10 }}
            />
            {renderSwitchState()}
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1 }}>
            Do you allow the attendees to take photos or videos during the meetup?
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default CameraPermission;
