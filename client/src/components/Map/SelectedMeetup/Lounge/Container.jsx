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

// components
import Chats from './Chats';
import TextBox from './TextBox';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

// import FABMenu from './Utils/FABMenu';
// ただ、ここではrouterで渡ってきたmeetupのidを使って呼び込んでくることになる。
// idで全てのchatのcommentを表示することになる。
// ここ、何でrerenderで同じobject出るんだろ。
const Container = (props) => {
  // const [meetup, setMeetup] = useState(null);
  const [chats, setChats] = useState([]);
  const bottomSheetTextBoxRef = useRef(null);

  const handleTextBoxBottomSheet = () => {
    if (!props.bottomSheet.textBox.isOpen) {
      // props.setIsPostBottomSheetOpen(false);
      // postBottomSheetRef.current?.close();
      props.setIsSelectedItemBottomSheetOpen(true);
      selectedItemBottomSheetRef.current?.snapToIndex(0);
    } else if (props.bottomSheet.selectedItem.isOpen) {
      console.log(meetupId);
      props.selectMeetup(meetupId);
      // props.setIsSelectedItemBottomSheetOpen(false);
      // selectedItemBottomSheetRef.current.close();
      // bottomSheetRef.current?.snapToIndex(-1);
    }
  };

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    // console.log(meetup);
    // setMeetup(meetup);
    setChats((previous) => [...previous, ...meetup.chatRoom.chats]);
  };

  useEffect(() => {
    getMeetup();
  }, []);

  // fabボタンやらをどっかに置いておいて、それをtapしてtextBoxのbottomSheetを出すようにする感じかな。
  return (
    <View>
      <Chats chats={chats} />
      <TextBox bottomSheetTextBoxRef={bottomSheetTextBoxRef} handleTextBoxBottomSheet={handleTextBoxBottomSheet} />
    </View>
  );
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(Container);
