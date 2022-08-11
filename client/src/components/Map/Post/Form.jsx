// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button, Select, CheckIcon } from 'native-base';

// components
import Buttons from './Buttons';
import NBProvider from '../../Utils/NativeBaseProvider';
// import NativeBaseModal from '../../Utils/NativeBaseModal';
import BaseModal from '../../Utils/BaseModal';
// ac
import { setIsSelectGenreModalOpen } from '../../../redux/actionCreators/modal';
import { setIsSelectLimitHourModalOpen } from '../../../redux/actionCreators/modal';

const Form = (props) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [genre, setGenre] = useState('food');
  const [limit, setLimit] = useState('1');
  const [service, setService] = React.useState('');

  const onSelectGenreModalClose = () => {
    props.setIsSelectGenreModalOpen(false);
  };

  const onSelectLimitHourModalClose = () => {
    props.setIsSelectLimitHourModalOpen(false);
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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity style={styles.genre} onPress={() => props.setIsSelectGenreModalOpen(true)}>
          <Text style={styles.text}>Food & Drink →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre} onPress={() => props.setIsSelectLimitHourModalOpen(true)}>
          <View>
            <Text style={styles.text}>1 hour →</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.genre}>
        <Text style={styles.text}>Post</Text>
      </TouchableOpacity>
      {/* {renderModal()} */}
      <BaseModal modalOpen={props.modal.selectGenre.isOpen} />

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
  limitHour: {},
});

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsSelectGenreModalOpen, setIsSelectLimitHourModalOpen })(Form);
