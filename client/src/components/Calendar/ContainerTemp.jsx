// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

// ac
import { getUpcomingJoinedMeetup } from '../../redux/actionCreators/meetups';

const ContainerTemp = (props) => {
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);

  const fetch = async () => {
    const result = await lampostAPI.post('/meetups/upcoming/joined', {
      upcomingJoinedMeetupIds: props.auth.data.upcomingJoinedMeetups,
    });
    const { upcomingJoinedMeetups } = result.data;
    console.log(upcomingJoinedMeetups);
    setUpcomingMeetups((previous) => {
      return [...previous, ...upcomingJoinedMeetups];
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderList = () => {
    const list = upcomingMeetups.map((meetup, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => props.navigation.navigate('Dummy')}>
          <Text>{meetup.startDateAndTime}</Text>
        </TouchableOpacity>
      );
    });

    return <View>{list}</View>;
  };

  if (upcomingMeetups.length) {
    return <SafeAreaView>{renderList()}</SafeAreaView>;
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { getUpcomingJoinedMeetup })(ContainerTemp);
