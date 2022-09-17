// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, Text } from 'react-native';

// ac
import { getUpcomingJoinedMeetup } from '../../redux/actionCreators/meetups';

const ContainerTemp = () => {
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);

  const fetch = async () => {
    const result = await lampostAPI.post('/meetups/upcoming/joined', {
      upcomingJoinedMeetupIds: props.auth.data.upcomingJoinedMeetups,
    });
    const { upcomingJoinedMeetups } = result.data;
    setUpcomingMeetups((previous) => {
      return [...previous, upcomingJoinedMeetups];
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  if (upcomingMeetups.length) {
    return (
      <View>
        <Text>here is gonna be listItme</Text>
      </View>
    );
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
