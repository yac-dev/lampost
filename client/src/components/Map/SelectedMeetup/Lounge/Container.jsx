// main libraries
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import lampostAPI from '../../../../apis/lampost';

// components
import Chats from './Chats';
import TextBox from './TextBox';
import FABMenu from './FABMenu';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  // const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);
  const textBoxBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

  const handleTextBoxBottomSheet = () => {
    if (!props.bottomSheet.textBox.isOpen) {
      // props.setIsPostBottomSheetOpen(false);
      // postBottomSheetRef.current?.close();
      props.setIsTextBoxBottomSheetOpen(true);
      textInputRef.current.focus();
      textBoxBottomSheetRef.current?.snapToIndex(0);
    } else if (props.bottomSheet.selectedItem.isOpen) {
      // 開いている状態なら。
      // console.log(meetupId);
      // props.selectMeetup(meetupId);
      // props.setIsSelectedItemBottomSheetOpen(false);
      // selectedItemBottomSheetRef.current.close();
      // bottomSheetRef.current?.snapToIndex(-1);
    }
  };

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    console.log(meetup);
    // console.log(meetup);
    // setMeetup(meetup);
    setChats((previous) => {
      return [...previous, ...meetup.chatRoom.chats];
    });
  };

  useEffect(() => {
    getMeetup();
  }, []);

  useEffect(() => {
    return () => {
      if (props.bottomSheet.textBox.isOpen) {
        props.setIsTextBoxBottomSheetOpen(false);
      }
    };
  });

  // fabボタンやらをどっかに置いておいて、それをtapしてtextBoxのbottomSheetを出すようにする感じかな。
  return (
    <View style={{ flex: 1 }}>
      <Chats chats={chats} />
      <TextBox textBoxBottomSheetRef={textBoxBottomSheetRef} textInputRef={textInputRef} />
      <FABMenu handleTextBoxBottomSheet={handleTextBoxBottomSheet} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(Container);
