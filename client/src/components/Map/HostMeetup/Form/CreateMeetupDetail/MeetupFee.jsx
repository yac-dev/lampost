// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput, Button } from 'react-native-paper';

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
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Is this meetup free to join?</Text>
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        {renderSwitchState()}
        <Switch
          value={props.state.isMeetupFeeFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_FEE_FREE', payload: '' })}
        />
        {renderFeeForm()}
      </View>
    </View>
  );
};

export default MeetupFee;
