import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import LogContext from './LogContext';
import { connect } from 'react-redux';
import lampostAPI from '../../../apis/lampost';

import Log from './Log';

// ここも、毎度自分のpageかの確認が必要だわな。
const Container = (props) => {
  // past meetupだけ、ここで撮ってくる。
  const [isMyPage, setIsMyPage] = useState();
  const [pastMeetups, setPastMeetups] = useState([]);

  useEffect(() => {
    if (props.route.params.userId === props.auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getPastMeetups = async () => {
    const result = await lampostAPI.get(`/users/${props.route.params.userId}/pastmeetups`);
    const { pastMeetups } = result.data;
    console.log(pastMeetups);
    setPastMeetups(pastMeetups);
  };
  useEffect(() => {
    getPastMeetups();
  }, []);

  const renderPastMeetups = () => {
    if (pastMeetups.length) {
      const pastMeetupsList = pastMeetups.map((meetup, index) => {
        return (
          // <TouchableOpacity key={index}>
          //   <Text>{meetup.title}</Text>
          // </TouchableOpacity>
          <LogContext.Provider value={{ meetup, isMyPage }}>
            <View key={index}>
              <Log />
            </View>
          </LogContext.Provider>
        );
      });

      return <View>{pastMeetupsList}</View>;
    } else {
      return <Text>Nothing...</Text>;
    }
  };

  // ここで、userId使ってpastMeetupsを取ってくる。
  return (
    <View>
      <Text>Log component</Text>
      <Text>{props.route.params.userId}</Text>
      <Text>{isMyPage ? 'yes' : 'no'}</Text>
      {renderPastMeetups()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
