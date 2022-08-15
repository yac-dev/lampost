// main libraries
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const postTypes = [
  { value: 'Bar', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
  { value: 'Food & Drink', id: '62f717747f3b648f706bed1b', iconName: 'food-fork-drink' },
  { value: 'Shopping', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
  { value: 'Party', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
  { value: 'Travel', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
  { value: 'Amazing', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
  { value: 'Sports match', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: 'Art', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: 'Business', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: 'Sports', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: 'Weather & Disaster', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: 'Traffic', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
];

const postLengthOptions = ['1 hour', '1 day', '∞'];

const Body = (props) => {
  const renderPostTypeMenus = () => {
    const options = postTypes.map((postType, index) => {
      return (
        <Menu.Item
          key={index}
          leadingIcon={postType.iconName}
          onPress={() => {
            props.setSelectedPostType(postType);
            props.setIsPostTypeMenuVisible(false);
          }}
          title={postType.value}
        />
      );
    });

    return <>{options}</>;
  };

  const renderPostLengthMenus = () => {
    const options = postLengthOptions.map((value, index) => {
      return (
        <Menu.Item
          key={index}
          onPress={() => {
            props.setSelectedPostLength(value);
            props.setIsPostLengthMenuVisible(false);
          }}
          title={value}
        />
      );
    });

    return <>{options}</>;
  };

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
      <View style={styles.bodyPostType}>
        <View style={styles.bodyPostType.header}>
          <MaterialIcons name='sports-bar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Post type</Text>
          <AntDesign name='questioncircle' size={15} />
        </View>
        <Menu
          visible={props.isPostTypeMenuVisible}
          onDismiss={() => props.setIsPostTypeMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsPostTypeMenuVisible(true)}>Select</Button>}
        >
          {renderPostTypeMenus()}
        </Menu>
      </View>
      <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.selectedPostType.value}</Text>

      <View style={styles.bodyPostLength}>
        <View style={styles.bodyPostLength.header}>
          <MaterialIcons name='sports-bar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Post length</Text>
        </View>
        <AntDesign name='questioncircle' size={15} />
        <Menu
          visible={props.isPostLengthMenuVisible}
          onDismiss={() => props.setIsPostLengthMenuVisible(false)}
          anchor={<Button onPress={() => props.setIsPostLengthMenuVisible(true)}>Select</Button>}
        >
          {renderPostLengthMenus()}
        </Menu>
      </View>
      <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.selectedPostLength}</Text>
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
  bodyPostType: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  bodyPostLength: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});
