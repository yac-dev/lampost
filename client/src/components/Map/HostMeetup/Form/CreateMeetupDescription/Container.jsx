import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// components
import Description from './Description';
import Reference from './Reference';

const Container = (props) => {
  return (
    <View>
      <Description state={props.state} dispatch={props.dispatch} />
      <Reference state={props.state} dispatch={props.dispatch} />
      <View>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DETAIL', payload: '' })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Back (3/4)</Text>
            <Entypo name='arrow-with-circle-left' size={25} />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => props.onSubmit()}>
          <Text>Done!</Text>
          <IconButton
            icon='arrow-right'
            iconColor={'blue'}
            size={20}
            // disabled={disableIconButton()}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Container;
