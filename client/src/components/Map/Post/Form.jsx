// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button, Select, CheckIcon } from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'native-base';

// components
import Buttons from './Buttons';
import NBProvider from '../../Utils/NativeBaseProvider';
// import NativeBaseModal from '../../Utils/NativeBaseModal';
import BaseModal from '../../Utils/BaseModal';
// ac
import { setIsPostBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';
import { createPost } from '../../../redux/actionCreators/posts';
import { setIsSelectGenreModalOpen } from '../../../redux/actionCreators/modal';
import { setIsSelectLimitHourModalOpen } from '../../../redux/actionCreators/modal';

// const postTypeOptions = [
//   '🍕 Food & Drink',
//   '🛍 Shopping',

//   '🎉 Party',
//   '⭐️ Amazing',
//   '⛹🏻‍♂️ Sports match',
//   '🙋‍♀️ Question & Help',
//   '🖼 Art',
//   '🧑‍💼 Business',
//   '🎾 Sports',
//   '🌤 Weather & Disaster',
//   '🚗 Traffic',
// ];

const postTypeOptions = [
  { value: '🍕 Food & Drink', id: '62f717747f3b648f706bed1b' },
  { value: '🛍 Shopping', id: '62f717c67f3b648f706bed1c' },
  { value: '🎉 Party', id: '62f718337f3b648f706bed1d' },
  { value: '✈️ Travel', id: '62f718627f3b648f706bed1e' },
  { value: '⭐️ Amazing', id: '62f718b17f3b648f706bed20' },
  { value: '⛹🏻‍♂️ Sports match', id: '62f718c77f3b648f706bed21' },
  { value: '🙋‍♀️ Question & Help', id: '62f718e37f3b648f706bed22' },
  { value: '🖼 Art', id: '62f718f87f3b648f706bed23' },
  { value: '🧑‍💼 Business', id: '62f7190e7f3b648f706bed24' },
  { value: '🎾 Sports', id: '62f719207f3b648f706bed25' },
  { value: '🌤 Weather & Disaster', id: '62f719347f3b648f706bed26' },
  { value: '🚗 Traffic', id: '62f7194a7f3b648f706bed27' },
];

const Form = (props) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [postType, setPostType] = useState('');
  const [limit, setLimit] = useState('1');
  const [service, setService] = React.useState('');

  const onSelectGenreModalClose = () => {
    props.setIsSelectGenreModalOpen(false);
  };

  const onSelectLimitHourModalClose = () => {
    props.setIsSelectLimitHourModalOpen(false);
  };

  const renderIcon = () => {
    return <Icon as={AntDesign} name='down' />;
  };

  // const renderModal = () => {
  //   if (props.modal.selectGenre.isOpen) {
  //     return (
  //       <NativeBaseModal
  //         modalOpen={props.modal.selectGenre.isOpen}
  //         title='Post genre'
  //         description='What are you gonna post about?'
  //         onClose={onSelectGenreModalClose}
  //       />
  //     );
  //   }
  // };

  const onPostPress = (selectedItem) => {
    const formData = {
      content: textAreaValue,
      postType: postType.id,
      userId: '62edfa7578dc6a45c95f3ef6',
      place: {
        type: 'Point',
        coordinates: [props.auth.currentLocation.longitude, props.auth.currentLocation.latitude],
      },
    };

    console.log(formData);
    props.createPost(formData);
    // ここでbottomSHeetを閉じる。
    props.setIsPostBottomSheetOpen(false);
    // bottomSheetRef.current?.snapToIndex(-1);
    props.postBottomSheetRef.current.close();
  };

  return (
    <ScrollView>
      <TextInput
        style={{ height: 200, padding: 20 }}
        multiline={true}
        numberOfLines={7}
        onChangeText={setTextAreaValue}
        value={textAreaValue}
        placeholder="What's going on around you?"
      />
      {/* <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity style={styles.genre} onPress={() => props.setIsSelectGenreModalOpen(true)}>
          <Text style={styles.text}>Food & Drink →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre} onPress={() => props.setIsSelectLimitHourModalOpen(true)}>
          <View>
            <Text style={styles.text}>1 hour →</Text>
          </View>
        </TouchableOpacity>
      </View> */}
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 10 }}>
        <SelectDropdown
          data={postTypeOptions}
          defaultButtonText={'Post about what?'}
          dropdownIconPosition={'right'}
          renderDropdownIcon={renderIcon}
          buttonStyle={{ borderRadius: 10, width: 300 }}
          rowStyle={{ borderRadius: 10 }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setPostType(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            // return selectedItem.value;
            return postType.value;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.value;
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 10,
          // width: 300,
        }}
      >
        <TouchableOpacity
          style={{
            width: 300,
            backgroundColor: 'rgb(65, 122, 204)',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            // flex: 1,
            // flexDirection: 'row',
          }}
          onPress={() => onPostPress()}
        >
          {/* <Icon as={AntDesign} name='down' /> */}
          <Text style={{ textAlign: 'center', color: '#fff' }}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* {renderModal()} */}
      {/* <BaseModal modalOpen={props.modal.selectGenre.isOpen} /> */}

      {/* <NativeBaseModal
        modalOpen={props.modal.selectGenre.isOpen}
        title='Post genre'
        description='What are you gonna post about?'
        onClose={onSelectGenreModalClose}
      >
        <View>
          <Text>Select Genre</Text>
        </View>
      </NativeBaseModal> */}
      {/* <NativeBaseModal
        modalOpen={props.modal.selectLimitHour.isOpen}
        title='Remaining'
        description='How long do you wanna keep this post on the map?'
        onClose={onSelectLimitHourModalClose}
      >
        <View>
          <Text>limit hour modal</Text>
        </View>
      </NativeBaseModal> */}

      {/* <NBProvider>
        <Buttons textAreaValue={textAreaValue} genre={genre} limit={limit} />
      </NBProvider> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  genre: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    // fontSize: 18,
    color: '#fff',
    // fontWeight: 'bold',
    alignSelf: 'center',
    // textTransform: 'uppercase',
  },
});

const mapStateToProps = (state) => {
  return { modal: state.modal, auth: state.auth };
};

export default connect(mapStateToProps, {
  setIsSelectGenreModalOpen,
  setIsSelectLimitHourModalOpen,
  setIsPostBottomSheetOpen,
  createPost,
})(Form);
