import React, { useState, useContext } from 'react';
import MapContext from '../../MeetupContext';
import { View, Text, ScrollView, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor } from '../../../../utils/colorsTable';

const QandAs = (props) => {
  // getcomments的なのが必要になるね。
  const { selectedMeetup, selectedMeetupDetailComponent } = useContext(MapContext);
  const inputAccessoryViewID = '2222222';
  const renderQandAs = () => {
    if (selectedMeetup.comments.length) {
      const qandAsList = selectedMeetup.comments.map((comment, index) => {
        return (
          <View key={index}>
            <Text>{comment.content}</Text>
          </View>
        );
      });

      return <ScrollView>{qandAsList}</ScrollView>;
    } else {
      return <Text style={{ color: baseTextColor }}>No comments yet...</Text>;
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Comments</Text>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>Feel free to ask something about this meetup!</Text>
      <BottomSheetTextInput
        multiline={true}
        placeholder='Add a question'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: sectionBackgroundColor,
          marginBottom: 10,
          borderWidth: 0.6,
          borderColor: sectionBackgroundColor,
          width: '100%', // ここも、下の修正に沿って80 90%に変える。
        }}
        // value={content}
        // onChangeText={setContent}
        autoCapitalize='none'
      />
      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor='hsl(0, 0%, 95%)'
        style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() =>
                // keybord dismissとともに、snappointを15%にまで下げる。
                Keyboard.dismiss()
              }
            >
              {/* <MaterialCommunityIcons name='comment-text' />; */}
              <Text>General</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
              <Text>Idea</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
              <Text>Question and Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              {/* <FontAwesome5 name='question' size={15} color={'white'} />; */}
              <Text>Announcement</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => onSendPress()}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </InputAccessoryView>
      {renderQandAs()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(QandAs);
