import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import LogContext from './LogContext';
import { connect } from 'react-redux';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

import Log from './Log';
import CreateRollBottomSheet from './CreateRollBottomSheet';
import CommentBottomSheet from './CommentBottomSheet';

// ここも、毎度自分のpageかの確認が必要だわな。
const Container = (props) => {
  // past meetupだけ、ここで撮ってくる。
  const [isMyPage, setIsMyPage] = useState();
  const [pastMeetups, setPastMeetups] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [bottomSheetType, setBottomSheetType] = useState('');
  const createRollBottomSheetRef = useRef(null);
  const addCommentBottomSheetRef = useRef(null);

  const handleCreateRollBottomSheet = (meetup) => {
    createRollBottomSheetRef.current?.snapToIndex(0);
    setSelectedMeetup(meetup);
  };

  const handleAddCommentBottomSheet = () => {
    addCommentBottomSheetRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    if (props.route.params.userId === props.auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getPastMeetupsByUserId = async () => {
    const result = await lampostAPI.get(`/pastmeetupanduserrelationships/${props.route.params.userId}`);
    const { pastMeetups } = result.data;
    setPastMeetups(pastMeetups);
  };
  useEffect(() => {
    getPastMeetupsByUserId();
  }, []);

  // const getPastMeetups = async () => {
  //   const result = await lampostAPI.get(`/users/${props.route.params.userId}/pastmeetups`);
  //   const { pastMeetups } = result.data;
  //   console.log(pastMeetups);
  //   setPastMeetups(pastMeetups);
  // };
  // useEffect(() => {
  //   getPastMeetups();
  // }, []);

  const renderPastMeetups = () => {
    if (pastMeetups.length) {
      const pastMeetupsList = pastMeetups.map((pastMeetup, index) => {
        return (
          <LogContext.Provider
            value={{ pastMeetup, index, isMyPage, handleCreateRollBottomSheet, handleAddCommentBottomSheet }}
          >
            <Log />
          </LogContext.Provider>
        );
      });

      return <View>{pastMeetupsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>Nothing...</Text>;
    }
  };

  // ここで、userId使ってpastMeetupsを取ってくる。
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {renderPastMeetups()}
      <CreateRollBottomSheet createRollBottomSheetRef={createRollBottomSheetRef} selectedMeetup={selectedMeetup} />
      <CommentBottomSheet addCommentBottomSheetRef={addCommentBottomSheetRef} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
