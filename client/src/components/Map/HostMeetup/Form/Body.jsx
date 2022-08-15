// main libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Body = (props) => {
  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 100 }}>
      {/* date and time */}
      <View style={styles.bodyDateAndTime}>
        <View style={styles.bodyDateAndTime.header}>
          <FontAwesome name='calendar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Date & Time</Text>
        </View>
        <View style={styles.bodyDateAndTime.startEndWrapper}>
          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
              mode='outlined'
              onPress={() => props.setIsStartDatePickerVisible(true)}
            >
              Start
            </Button>
            {/* <Text>{`${new Date(startDate)}`}</Text> */}
            <Text>startDate</Text>
          </View>
          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
              mode='outlined'
              onPress={() => props.setIsEndDatePickerVisible(true)}
            >
              end
            </Button>
            {/* <Text>{`${new Date(endDate)}`}</Text> */}
            <Text>endDate</Text>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={props.isStartDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleStartDateConfirm(date)}
          onCancel={() => setStartDatePickerVisibility(false)}
          is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={props.isEndDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleEndDateConfirm(date)}
          onCancel={() => setEndDatePickerVisibility(false)}
          is24Hour={true}
        />
      </View>
      {/* title */}
      <View style={styles.bodyTitle}>
        <View style={styles.bodyTitle.header}>
          <AntDesign name='edit' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Title</Text>
        </View>
        <TextInput
          // style={{ marginTop: 10 }}
          // label='Title'
          placeholder='Please write the meetup title.'
          value={props.title}
          onChangeText={(text) => props.setTitle(text)}
          // left={<TextInput.Icon name='eye' />}
          mode='outlined'
          right={<TextInput.Affix text='/65' />}
        />
      </View>
      {/* detail */}
      <View style={styles.bodyDetail}>
        <View style={styles.bodyTitle.header}>
          <AntDesign name='edit' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Detail</Text>
        </View>
        <TextInput
          style={styles.bodyDetail.textInput}
          // style={{ height: '100%' }} にすると、bug waringが出る。しかし、一応使える。ただ、left iconありにすると。エラーが出て無理。なんだろうな。このflex: 1って一体。。。もっと精査しないとな。
          mode='outlined'
          value={props.detail}
          onChangeText={(text) => props.setDetail(text)}
          // left={<TextInput.Icon name='application-edit-outline' />}
          placeholder='Please write the detail about your meetup.'
          // label='Detail'
          multiline={true}
          // numberOfLines={10}
        />
      </View>

      <View style={styles.bodyAttendees}>
        <View style={styles.bodyAttendees.header}>
          <MaterialIcons name='sports-bar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Meetup type</Text>
        </View>
        <Menu
          visible={props.isAttendeesMenuVisible}
          onDismiss={() => props.setIsAttendeesMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsAttendeesMenuVisible(true)}>Show menu</Button>}
        >
          <Menu.Item onPress={() => {}} title='3' />
          <Menu.Item onPress={() => {}} title='4' />
          <Menu.Item onPress={() => {}} title='5' />
          <Menu.Item onPress={() => {}} title='6' />
          <Menu.Item onPress={() => {}} title='7' />
          <Menu.Item onPress={() => {}} title='8' />
          <Menu.Item onPress={() => {}} title='9' />
          <Menu.Item onPress={() => {}} title='10' />
          <Menu.Item onPress={() => {}} title='11' />
          <Menu.Item onPress={() => {}} title='12' />
          <Menu.Item onPress={() => {}} title='13' />
          <Menu.Item onPress={() => {}} title='14' />
          <Menu.Item onPress={() => {}} title='15' />
          <Menu.Item onPress={() => {}} title='Free' />
        </Menu>
        {/* <TextInput
          // label='Attendees limit'
          placeholder='How many people can attend? e.g) free, 10'
          value={props.attendeesLimit}
          // onChangeText={text => setText(text)}
          // left={<TextInput.Icon name='eye' />}
          mode='outlined'
        /> */}
      </View>
      {/* footer */}
      <View style={styles.bodyAttendees}>
        <View style={styles.bodyAttendees.header}>
          <MaterialCommunityIcons name='account-group' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Attendees limit</Text>
          <AntDesign name='questioncircle' size={15} />
        </View>
        {/* <TextInput
          // label='Attendees limit'
          placeholder='How many people can attend? e.g) free, 10'
          value={props.attendeesLimit}
          // onChangeText={text => setText(text)}
          // left={<TextInput.Icon name='eye' />}
          mode='outlined'
        /> */}
        <Menu
          visible={props.isAttendeesMenuVisible}
          onDismiss={() => props.setIsAttendeesMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsAttendeesMenuVisible(true)}>Show menu</Button>}
        >
          <Menu.Item onPress={() => {}} title='3' />
          <Menu.Item onPress={() => {}} title='4' />
          <Menu.Item onPress={() => {}} title='5' />
          <Menu.Item onPress={() => {}} title='6' />
          <Menu.Item onPress={() => {}} title='7' />
          <Menu.Item onPress={() => {}} title='8' />
          <Menu.Item onPress={() => {}} title='9' />
          <Menu.Item onPress={() => {}} title='10' />
          <Menu.Item onPress={() => {}} title='11' />
          <Menu.Item onPress={() => {}} title='12' />
          <Menu.Item onPress={() => {}} title='13' />
          <Menu.Item onPress={() => {}} title='14' />
          <Menu.Item onPress={() => {}} title='15' />
          <Menu.Item onPress={() => {}} title='Free' />
        </Menu>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyDateAndTime: {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    startEndWrapper: {
      paddingTop: 20,
      date: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        button: {
          marginRight: 5,
        },
      },
    },
  },
  bodyTitle: {
    marginTop: 30,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  bodyDetail: {
    marginTop: 30,
    height: 250,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
    },
  },
  menus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bodyAttendees: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

export default Body;
