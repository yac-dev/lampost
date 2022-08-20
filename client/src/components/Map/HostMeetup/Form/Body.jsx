// main libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// glass-mug-variant
// head
// kabaddi
// karate
// skateboarding
// soccer-field
// basketball-hoop-outline

// const meetupTypes = [
//   { value: 'Bar', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
//   { value: 'Food & Drink', id: '62f717747f3b648f706bed1b', iconName: 'food-fork-drink' },
//   { value: 'Shopping', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
//   { value: 'Party', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
//   { value: 'Travel', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
//   { value: 'Amazing', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
//   { value: 'Sports match', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
//   { value: 'Art', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
//   { value: 'Business', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
//   { value: 'Sports', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
//   { value: 'Weather & Disaster', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
//   { value: 'Traffic', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
// ];

const meetupTypes = [
  { value: '🍺 Bar', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
  { value: '☕️ Coffee', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
  { value: '🍣 Food', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
  { value: '🥕 Vegetarian', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '✈️ Travel', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
  { value: '🖼 Art', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🏟 Watching game', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '🏀 Ball sports', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
  { value: '💪 Workout', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏃‍♀️ Running', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '🧘‍♀️ Yoga', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '💃 Dance', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🏂 Snow sports', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏄‍♂️ Surf', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🗻 Hiking', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🚴‍♂️ Bike', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '🚘 Cars', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏍 Motorcycle', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '💻 Tech', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '⛺️ Camp', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '📚 Reading', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '🛍 Shopping', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎮 Video game', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
  { value: '🍳 Cooking', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
  { value: '📷 Photography', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
  { value: '🦄 Start up', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
  { value: '🍖 BBQ & Camp', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
  { value: '🍿 Movie', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🎤 Karaoke', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🧑‍🏫 Teaching', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🛹 Street sports', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🐧 Aquarium', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🎵 Live', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '👩‍🎤 Anime', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🐶 Pet', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '🦒 Zoo', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '🛠 DIY', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎯 Darts', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎧 Listening Music', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎹 Playing music', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎸 Guitar', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '♟ Chess', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '☖ Shogi', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎳 Bowling', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '📈 Investment', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🍰 Sweets', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🃏 Tramp', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎡 Amusement park', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🗿 Foreign culture', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🌎 Language', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🧥 Fashion', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎣 Fishing', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🥷 Cosplay', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🧹 Volunteer', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
];

const attendeesOptions = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'Free'];

const Body = (props) => {
  const renderMeetupTypeMenus = () => {
    const options = meetupTypes.map((meetupType, index) => {
      return (
        <Menu.Item
          key={index}
          // leadingIcon={meetupType.iconName}
          onPress={() => {
            props.setSelectedMeetupType(meetupType);
            props.setIsMeetupTypeMenuVisible(false);
          }}
          title={meetupType.value}
        />
      );
    });

    return <>{options}</>;
  };

  const renderAttendeesLimitMenus = () => {
    const options = attendeesOptions.map((value, index) => {
      return (
        <Menu.Item
          key={index}
          onPress={() => {
            props.setSelectedAttendeesLimit(value);
            props.setIsAttendeesMenuVisible(false);
          }}
          title={value}
        />
      );
    });

    return <>{options}</>;
  };

  const renderAttendeesLimit = () => {
    if (!props.selectedAttendeesLimit) {
      return null;
    } else if (props.selectedAttendeesLimit === 'Free') {
      return <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.selectedAttendeesLimit}</Text>;
    } else {
      return <Text style={{ fontSize: 17, textAlign: 'center' }}>{`${props.selectedAttendeesLimit} people`}</Text>;
    }
  };

  const onStartDateConfirm = (date) => {
    props.setStartDate(date);
    props.setIsStartDatePickerVisible(false);
  };

  const onEndDateConfirm = (date) => {
    props.setEndDate(date);
    props.setIsEndDatePickerVisible(false);
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          year: 'numeric',
        })}`}</Text>
      );
    } else {
      return null;
    }
  };

  const onToggleSwitch = () => {
    props.setIsSwitchOn(!props.isSwitchOn);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 150 }}>
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
            {renderDate(props.startDate)}
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
            {renderDate(props.endDate)}
          </View>
        </View>
        <DateTimePickerModal
          isVisible={props.isStartDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => onStartDateConfirm(date)}
          onCancel={() => props.setIsStartDatePickerVisible(false)}
          is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={props.isEndDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => onEndDateConfirm(date)}
          onCancel={() => setEndDatePickerVisibility(false)}
          is24Hour={true}
        />
      </View>
      {/* title */}
      <View style={styles.bodyTitle}>
        <View style={styles.bodyTitle.header}>
          <AntDesign name='edit' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Meetup title</Text>
        </View>
        <TextInput
          // style={{ marginTop: 10 }}
          // label='Meetup title'
          // placeholder='Please write about your meetup'
          value={props.title}
          onChangeText={(text) => props.setTitle(text)}
          // left={<TextInput.Icon name='eye' />}
          mode='outlined'
          right={<TextInput.Affix text='/80' />}
        />
      </View>
      {/* detail */}
      {/* <View style={styles.bodyDetail}>
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
      </View> */}

      <View style={styles.bodyAttendees}>
        <View style={styles.bodyAttendees.header}>
          <MaterialIcons name='sports-bar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>What is this meetup about?</Text>
        </View>
        <Menu
          visible={props.isMeetupTypeMenuVisible}
          onDismiss={() => props.setIsMeetupTypeMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsMeetupTypeMenuVisible(true)}>Select</Button>}
        >
          {renderMeetupTypeMenus()}
        </Menu>
      </View>
      <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.selectedMeetupType.value}</Text>

      {/* fee */}
      <View style={styles.bodyAttendees}>
        <View style={styles.bodyAttendees.header}>
          <FontAwesome5 name='money-bill-alt' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Is it free to join?</Text>
          {/* <AntDesign name='questioncircle' size={15} /> */}
        </View>
        {/* <Menu
          visible={props.isAttendeesMenuVisible}
          onDismiss={() => props.setIsAttendeesMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsAttendeesMenuVisible(true)}>Select</Button>}
        >
          {renderAttendeesLimitMenus()}
        </Menu> */}
        <Switch value={props.isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      {renderAttendeesLimit()}
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
    // justifyContent: 'space-between',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

export default Body;
