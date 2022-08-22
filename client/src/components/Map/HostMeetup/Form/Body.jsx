// main libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Image } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// components
import MeetupGenreMenu from './MeetupGenreMenu';

const currencyOptions = ['$USD', '£GBP', '€EUR', '¥JPY', '$CAD'];

const Body = (props) => {
  const renderCurrencies = () => {
    const currencies = currencyOptions.map((element, index) => {
      return (
        <Menu.Item
          key={index}
          onPress={() => {
            props.dispatch({ type: 'SET_CURRENCY', payload: element });
            props.dispatch({ type: 'SET_IS_CURRENCY_MENU_VISIBLE', payload: false });
          }}
          title={element}
        />
      );
    });
    return <>{currencies}</>;
  };

  const renderAddMoreMenu = () => {
    if (props.state.meetupGenres.length >= 1 && props.state.meetupGenres[0] && props.state.meetupGenres.length <= 2) {
      return (
        <Button
          icon='plus'
          mode='contained'
          onPress={() => {
            props.dispatch({ type: 'ADD_MORE_MEETUP_GENRE', payload: '' });
          }}
        >
          Add
        </Button>
      );
    }
  };

  const renderMeetupGenresMenu = () => {
    const meetupGenresMenu = props.state.meetupGenres.map((value, index) => {
      return (
        <MeetupGenreMenu key={index} index={index} meetupGenres={props.state.meetupGenres} dispatch={props.dispatch} />
      );
    });

    return <>{meetupGenresMenu}</>;
  };

  const onStartDateConfirm = (date) => {
    props.dispatch({ type: 'SET_START_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false });
  };

  const onEndDateConfirm = (date) => {
    props.dispatch({ type: 'SET_END_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: false });
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

  const renderSwitchState = () => {
    if (props.state.isMeetupFree) {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>Yes</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>No</Text>;
    }
  };

  const onToggleSwitch = () => {
    props.dispatch({ type: 'SET_IS_MEETUP_FREE', payload: '' });
  };

  const renderFeeForm = () => {
    if (!props.state.isMeetupFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Menu
            visible={props.state.isCurrencyMenuVisible}
            onDismiss={() => props.dispatch({ type: 'SET_IS_CURRENCY_MENU_VISIBLE', payload: false })}
            anchor={
              <Button onPress={() => props.dispatch({ type: 'SET_IS_CURRENCY_MENU_VISIBLE', payload: true })}>
                Select
              </Button>
            }
          >
            {renderCurrencies()}
          </Menu>
          <Text style={{ marginLeft: 5 }}>{props.state.currency}</Text>
          <TextInput
            style={{ width: 150, marginLeft: 10 }}
            mode='outlined'
            label='How much?'
            value={props.state.fee}
            onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 150 }}>
      {/* title */}
      <View style={styles.bodyTitle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={styles.bodyTitle.header}>
            <AntDesign name='edit' size={24} />
            <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Meetup title</Text>
          </View>
          <Menu
            visible={props.state.isMeetupPrivacyMenuVisible}
            onDismiss={() => props.dispatch({ type: 'SET_IS_MEETUP_PRIVACY_MENU_VISIBLE', payload: false })}
            anchor={
              <Button onPress={() => props.dispatch({ type: 'SET_IS_MEETUP_PRIVACY_MENU_VISIBLE', payload: true })}>
                public
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                props.dispatch({ type: 'SET_IS_MEETUP_PUBLIC', payload: true });
                props.dispatch({ type: 'SET_IS_MEETUP_PRIVACY_MENU_VISIBLE', payload: false });
              }}
              title={'public'}
            />
            {/* <Menu.Item
              onPress={() => {
                props.dispatch({ type: 'SET_IS_MEETUP_PUBLIC', payload: false });
                props.dispatch({ type: 'SET_IS_MEETUP_PRIVACY_MENU_VISIBLE', payload: false });
              }}
              title={'private'}
            /> */}
          </Menu>
        </View>
        <TextInput
          // style={{ marginTop: 10 }}
          // label='Meetup title'
          value={props.state.title}
          onChangeText={(text) => props.dispatch({ type: 'SET_TITLE', payload: text })}
          // left={<TextInput.Icon name='eye' />}
          mode='outlined'
          right={<TextInput.Affix text={`${props.state.title.length}/80`} />}
        />
      </View>

      {/* date and time */}
      <View style={styles.bodyDateAndTime}>
        <View style={styles.bodyDateAndTime.header}>
          <FontAwesome name='calendar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>When do you host it?</Text>
        </View>
        <View style={styles.bodyDateAndTime.startEndWrapper}>
          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
              mode='outlined'
              onPress={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: true })}
            >
              Start
            </Button>
            {renderDate(props.state.startDateAndTime)}
          </View>
          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
              mode='outlined'
              onPress={() => props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: true })}
            >
              end
            </Button>
            {renderDate(props.state.endDateAndTime)}
          </View>
        </View>
        <DateTimePickerModal
          isVisible={props.state.isStartDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => onStartDateConfirm(date)}
          onCancel={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false })}
          is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={props.state.isEndDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => onEndDateConfirm(date)}
          onCancel={() => setEndDatePickerVisibility(false)}
          is24Hour={true}
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

      {/* meetupgenres */}
      <View style={styles.bodyInterests}>
        <View style={styles.bodyInterests.header}>
          <View style={styles.bodyInterests.header.title}>
            <MaterialIcons name='sports-bar' size={24} />
            <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>
              What is your meetup about?
            </Text>
          </View>
          {renderAddMoreMenu()}
        </View>
        {/* <View style={styles.bodyInterests.menu}>
          <Menu
            visible={props.isMeetupTypeMenuVisible}
            onDismiss={() => props.setIsMeetupTypeMenuVisible(false)}
            anchor={<Button onPress={() => props.setIsMeetupTypeMenuVisible(true)}>Select</Button>}
          >
            {renderMeetupTypeMenus()}
          </Menu>
          <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.selectedMeetupType.value}</Text>
        </View> */}
        {renderMeetupGenresMenu()}
      </View>

      {/* fee select */}
      <View style={styles.bodyFeeSelect}>
        <View style={styles.bodyFeeSelect.header}>
          <FontAwesome5 name='money-bill-alt' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Is it free to join?</Text>
        </View>
        {/* <Menu
          visible={props.isAttendeesMenuVisible}
          onDismiss={() => props.setIsAttendeesMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsAttendeesMenuVisible(true)}>Select</Button>}
        >
          {renderAttendeesLimitMenus()}
        </Menu> */}
        <View style={styles.bodyFeeSelect.switchMenu}>
          {renderSwitchState()}
          <Switch value={props.state.isMeetupFree} onValueChange={onToggleSwitch} />
        </View>
      </View>

      {/* fee form */}
      {renderFeeForm()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyDateAndTime: {
    marginTop: 30,
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
  bodyInterests: {
    marginTop: 30,
    // justifyContent: 'space-between',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      title: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    menu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  bodyFeeSelect: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchMenu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  bodyFeeForm: {},
});

export default Body;
