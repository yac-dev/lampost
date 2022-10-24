import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

// components
import SelectedBadges from './SelectedBadges/Badges';

//ac
import { setIsSelectMeetupBadgesModalOpen } from '../../../../redux/actionCreators/modal';

const CreateMeetupBadge = (props) => {
  const disableIconButton = () => {
    if (!props.selectedBadges.length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      <View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <View
              style={{
                backgroundColor: 'rgba(255, 51, 51, 0.85)',
                padding: 5,
                borderRadius: 7,
                width: 35,
                height: 35,
                alignItems: 'center',
              }}
            >
              <AntDesign name='edit' size={25} color='white' />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Title</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>Please write the meetup title.</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
            <BottomSheetTextInput
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: '#E9E9E9',
                color: '#424242',
                borderRadius: 5,
              }}
              // value={props.searchQuery}
              // onChangeText={props.setSearchQuery}
            />
            <Text style={{ padding: 10, fontWeight: 'bold' }}>35/40</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <View
              style={{
                backgroundColor: 'rgba(45, 209, 40, 0.85)',
                padding: 5,
                borderRadius: 7,
                width: 35,
                height: 35,
                alignItems: 'center',
              }}
            >
              <Foundation name='sheriff-badge' size={25} color='white' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Badges</Text>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}
                    onPress={() => props.navigation.navigate('Add badges')}
                  >
                    <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
                    <Text>Add</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
                  What kind of meetup you'll launch?
                </Text>
              </View>
            </View>
          </View>
          <SelectedBadges />
        </View>
      </View>

      <TouchableOpacity
        style={{ alignSelf: 'center' }}
        onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text>Next (2/3)</Text>
          <Entypo name='arrow-with-circle-right' size={25} />
        </View>
      </TouchableOpacity>
      {/* <Button mode='outlined' onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}>
        Next
      </Button> */}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Next (2/3)</Text>
        <Entypo name='arrow-with-circle-right' size={25} />
      </View> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedBadges: Object.values(state.selectedItem.badges) };
};

export default connect(mapStateToProps, { setIsSelectMeetupBadgesModalOpen })(CreateMeetupBadge);
