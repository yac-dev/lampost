// main libraries
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu } from 'react-native-paper';

const Body = (props) => {
  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 150 }}>
      <View style={styles.bodyContent}>
        <TextInput
          style={styles.bodyContent.textInput}
          // style={{ height: '100%' }} にすると、bug waringが出る。しかし、一応使える。ただ、left iconありにすると。エラーが出て無理。なんだろうな。このflex: 1って一体。。。もっと精査しないとな。
          mode='outlined'
          value={props.detail}
          onChangeText={(text) => props.setDetail(text)}
          // left={<TextInput.Icon name='application-edit-outline' />}
          // placeholder="What's going on around you?"
          label="What's going on around you?"
          multiline={true}
          // numberOfLines={10}
        />
      </View>
    </ScrollView>
  );
};

export default Body;

const styles = StyleSheet.create({
  bodyContent: {
    height: 250,
    textInput: {
      flex: 1,
    },
  },
});
