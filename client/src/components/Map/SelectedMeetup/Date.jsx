import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const Date = (props) => {
  const { MaterialCommunityIcons, MaterialIcons, Ionicons } = iconsTable;
  const { auth, setMyUpcomingMeetups } = useContext(GlobalContext);

  const renderTime = (date, duration) => {
    const baseTime = new Date(date);
    const startTime = baseTime.toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(startTime);
    // const startDateElements = startTime.split(', ');
    // var endTime = new Date(baseTime);
    // endTime.setMinutes(baseTime.getMinutes() + duration);
    // endTime = endTime.toLocaleDateString('en-US', {
    //   hourCycle: 'h23',
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
    // const endDateElements = endTime.split(', ');
    const dateElements = startTime.split(', ');

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: baseTextColor, fontSize: 15 }}>{dateElements[1]}</Text>
      </View>
    );
  };

  const editDate = async () => {
    const payload = {};
    const result = await lampostAPI.patch(`/meetups/${meetupId}`, payload);
  };
  // console.log(props.route.params);

  const renderEdit = (field) => {
    if (auth.data._id === props.route.params.launcherId) {
      return (
        <TouchableOpacity
          onPress={() => console.log('k')}
          style={{
            backgroundColor: iconColorsTable['blue1'],
            padding: 5,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <MaterialIcons name='edit' color={'white'} size={20} style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Edit</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {/* <Text style={{ color: 'white' }}>Starts at: {renderTime(props.route.params.date)}</Text> */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons
              name='party-popper'
              size={20}
              color={iconColorsTable['violet1']}
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: 'white', fontSize: 20 }}>Starts at</Text>
          </View>
          <Text style={{ color: 'white' }}>{props.route.params.date}</Text>
        </View>
        {renderEdit()}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialIcons
              name='hourglass-top'
              size={20}
              color={iconColorsTable['green1']}
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: 'white', fontSize: 20 }}>Duration</Text>
          </View>
          <Text style={{ color: 'white' }}>{props.route.params.duration} minutes</Text>
        </View>
        {renderEdit()}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Ionicons name='book' size={20} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontSize: 20 }}>Agenda</Text>
          </View>
          <Text style={{ color: 'white' }}>{props.route.params.agenda} minutes</Text>
        </View>
        {renderEdit()}
      </View>
    </View>
  );
};

export default Date;
