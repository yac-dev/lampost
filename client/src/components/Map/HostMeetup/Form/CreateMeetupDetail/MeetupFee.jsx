// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput, Button } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const currencyOptions = ['$USD', '£GBP', '€EUR', '¥JPY', '$CAD'];

const MeetupFee = (props) => {
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

  const renderSwitchState = () => {
    if (props.state.isMeetupFeeFree) {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>Yes</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>No</Text>;
    }
  };

  const renderFeeForm = () => {
    if (!props.state.isMeetupFeeFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Menu
            visible={props.state.isCurrencyMenuVisible}
            onDismiss={() => props.dispatch({ type: 'SET_IS_CURRENCY_MENU_VISIBLE', payload: false })}
            anchor={
              <Button onPress={() => props.dispatch({ type: 'SET_IS_CURRENCY_MENU_VISIBLE', payload: true })}>
                {props.state.currency ? props.state.currency : 'Select'}
              </Button>
            }
          >
            {renderCurrencies()}
          </Menu>
          {/* <Text>{props.state.currency}</Text> */}
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
    // <View style={{ marginTop: 20 }}>
    //   <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Is this meetup free to join?</Text>
    //   <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
    //     {renderSwitchState()}
    //     <Switch
    //       value={props.state.isMeetupFeeFree}
    //       onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_FEE_FREE', payload: '' })}
    //     />
    //     {renderFeeForm()}
    //   </View>
    // </View>
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: 'rgba(236, 164, 20, 0.85)',
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Foundation name='dollar-bill' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15 }}>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Fee</Text>
            <Switch
              value={props.state.isMeetupFeeFree}
              onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_FEE_FREE', payload: '' })}
              style={{ marginRight: 10 }}
            />
            {renderSwitchState()}
          </View>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Fee</Text> */}
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>Is this meetup free to join?</Text>
        </View>
      </View>
      {/* <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={props.state.isMeetupFeeFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_FEE_FREE', payload: '' })}
        />
        {renderSwitchState()}
      </View> */}
      {renderFeeForm()}
    </View>
  );
};

export default MeetupFee;
