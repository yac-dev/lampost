import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateAndYear from './DateAndYear';
import BadgeLabel from './BadgeLabel';
import { Ionicons } from '@expo/vector-icons';
import { baseTextColor, screenBorderBottomColor } from '../../utils/colorsTable';

const MeetupBlogPostBody = (props) => {
  const { meetup } = props;

  const renderBadgeLabels = (badges) => {
    const list = badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return <ScrollView horizontal={true}>{list}</ScrollView>;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        {/* {renderDate(launchedMeetupObject.meetup.startDateAndTime)} */}
        <DateAndYear date={meetup.startDateAndTime} />
        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', flexShrink: 1 }}>{meetup.title}</Text>
      </View>
      <View style={{ marginBottom: 15 }}>{renderBadgeLabels(meetup.badges)}</View>
      <View style={{ marginBottom: 10 }}>
        {meetup.representation ? (
          <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>
            {meetup.representation}
          </Text>
        ) : (
          <Text style={{ color: baseTextColor }}>You'll see the launcher's comment here.</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Ionicons name='ios-remove-outline' size={25} color={'white'} style={{ marginRight: 5 }} />
          {/* <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View> */}
          <Text style={{ color: 'white', fontSize: 15 }}>{meetup.launcher.name}</Text>
        </View>
        {/* {renderAddRepresentationButton(meetup.representation)} */}
      </View>
    </View>
  );
};

export default MeetupBlogPostBody;
