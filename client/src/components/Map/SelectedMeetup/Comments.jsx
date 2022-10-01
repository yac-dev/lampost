// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import { View, Text } from 'react-native';

// components
import Communications from '../../Utils/Communications';

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  const getMeetupComments = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/comments`);
    const { meetup } = result.data;
    setComments((previous) => [...previous, ...meetup.comments]);
  };

  useEffect(() => {
    getMeetupComments();
  }, []);

  const renderSwitch = () => {
    switch (true) {
      case comments.length === 0:
        return (
          <View>
            <Text>No questions asked yet...</Text>
          </View>
        );
      case comments.length >= 1:
        return <Communications array={comments} />;
      default:
        return (
          <View>
            <Text>Loading....</Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      {renderSwitch()}
      <View>
        <Text>Text input here</Text>
      </View>
    </View>
  );
};

export default Comments;
