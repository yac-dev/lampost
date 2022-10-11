// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, InputAccessoryView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const QandA = (props) => {
  // ここで、commentsを全てrenderする。replyも含めてね。
  const inputAccessoryViewID = 'uniqueID';
  const [comments, setComments] = useState(props.selectedMeetup.comments);
  // なんで、これでcpuのusageが爆発する？？？
  // useEffect(() => {
  //   setComments((previous) => [...previous, ...props.selectedMeetup.comments]);
  // });

  const renderComments = () => {
    if (!comments.length) {
      return (
        <View style={{ marginTop: 10 }}>
          <Text>No comments added yet.</Text>
        </View>
      );
    } else {
      const commentsList = comments.map((comment, index) => {
        return (
          <View key={index}>
            <Text>{comment.content}</Text>
          </View>
        );
      });

      return <View style={{marginTop: 10}}>{commentsList}</View>;
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', paddingBottom: 10 }}>
          <BottomSheetTextInput
            placeholder='add commenty'
            inputAccessoryViewID={inputAccessoryViewID}
            style={{ flex: 1, borderRadius: 10 }}
          />
          <IconButton icon='send' size={15} containerColor={'white'} iconColor={'#051561'}
            onPress={() => {console.log('ask question')}} />
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={'#B0B0B0'}
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <View style={{ alignItems: 'flex-end', padding:10 }}>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      </TouchableWithoutFeedback>
      {renderComments()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(QandA);
