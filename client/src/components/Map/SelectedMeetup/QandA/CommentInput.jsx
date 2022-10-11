// main libraries
import React, { useState, useEffect } from 'react';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, InputAccessoryView } from 'react-native';
import { connect } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const Container = (props) => {
  const inputAccessoryViewID = 'uniqueID';

  // const addComment = async () => {
  //   const result = await lampostAPI.post('/comments');
  //   const { comment } = result.data;
  //   props.setComments((previous) => [...previous, comment]);
  // };

  const addComment = async () => {
    if (props.reply.pressed) {
      const result = await lampostAPI.post('/comments');
      const { comment } = result.data;
      props.setComments((previous) => [...previous, comment]);
    } else {
      const result = await lampostAPI.post('/comments/reply');
      const { comment } = result.data;
      props.setComments((previous) => [...previous, comment]);
    }
  };

  const renderReplyingTo = () => {
    if (props.reply.pressed) {
      return <Text>{reply.comment.content}</Text>;
    } else {
      return null;
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', paddingBottom: 10 }}>
          <BottomSheetTextInput
            placeholder='add comment'
            inputAccessoryViewID={inputAccessoryViewID}
            style={{ flex: 1, borderRadius: 10 }}
            ref={props.inputRef}
          />
          <IconButton
            icon='send'
            size={15}
            containerColor={'white'}
            iconColor={'#051561'}
            onPress={() => {
              console.log('ask question');
            }}
          />
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={'#B0B0B0'}
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <View style={{ alignItems: 'flex-end', padding: 10 }}>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      </TouchableWithoutFeedback>
      {renderReplyingTo()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Container);
