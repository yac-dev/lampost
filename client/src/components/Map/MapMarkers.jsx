import React, { useContext, useEffect } from 'react';
import lampostAPI from '../../apis/lampost';
import MapContext from './MeetupContext';
import MeetupMarker from './MeetupMarker';

import { getMeetups } from '../../redux/actionCreators/meetups';
import { selectMeetup } from '../../redux/actionCreators/selectItem';

const MapMarkers = (props) => {
  const { meetups, selectedMeetup, setSelectedMeetup, selectedMeetupBottomSheetRef } = useContext(MapContext);

  const renderMeetups = () => {
    const meetupsArray = Object.values(meetups);
    if (meetupsArray.length) {
      const meetupsList = meetupsArray.map((meetup, index) => {
        return <MeetupMarker key={index} meetup={meetup} />;
      });
      return <>{meetupsList}</>;
    } else {
      return null;
    }
  };

  return <>{renderMeetups()}</>;
};

export default MapMarkers;
