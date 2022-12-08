import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import LogsContext from './LogsContext';
import LogContext from './LogContext';
import { connect } from 'react-redux';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

// import Log from './Log';
import Log from './Log/Container';
import AddImpressionsBottomSheet from './AddImpressionsBottomSheet';

// ここも、毎度自分のpageかの確認が必要だわな。
const Container = (props) => {
  // past meetupだけ、ここで撮ってくる。
  const [isMyPage, setIsMyPage] = useState();
  const [pastMeetups, setPastMeetups] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  // const [bottomSheetType, setBottomSheetType] = useState('');
  const addImpressionsBottomSheetRef = useRef(null);

  useEffect(() => {
    if (props.auth.isAuthenticated && props.route.params.userId === props.auth.data._id) {
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
  console.log(pastMeetups);

  const renderPastMeetups = () => {
    if (pastMeetups.length) {
      const pastMeetupsList = pastMeetups.map((pastMeetup, index) => {
        return (
          <LogContext.Provider value={{ pastMeetup }}>
            <Log key={index} />
          </LogContext.Provider>
        );
      });

      return <View>{pastMeetupsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>Nothing...</Text>;
    }
  };

  return (
    <LogsContext.Provider value={{ isMyPage, addImpressionsBottomSheetRef }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {renderPastMeetups()}
        <AddImpressionsBottomSheet />
      </View>
    </LogsContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
