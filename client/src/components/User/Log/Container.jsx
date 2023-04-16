import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, FlatList, Image } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import LogContext from './LogContext';
import lampostAPI from '../../../apis/lampost';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import SelectedDateBottomSheet from './SelectedDateBottomSheet/Container';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

const LogContainer = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, isIpad, setSnackBar } = useContext(GlobalContext);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState('');
  const [meetupsTable, setMeetupsTable] = useState({});
  const selectedDateBottomSheetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [dateMeetups, setDateMeetups] = useState([]);
  const [isFetchedDateMeetups, setIsFetchedDateMeetups] = useState(false);
  // {2023-5: {3: assetObj , 4: assetObj, 5: assetObj}} って感じか。

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const key = `${year}-${month}`;
    setCurrentYearAndMonth(key);
  }, []);

  const getUserMeetupsByYearAndMonth = async () => {
    const result = await lampostAPI.get(
      `/meetupanduserrelationships/user/${props.route.params.userId}?yearAndMonth=${currentYearAndMonth}`
    );
    const { meetupAndUserRelationships } = result.data;
    const table = {};
    meetupAndUserRelationships.forEach((relationship) => {
      const date = new Date(relationship.createdAt).toISOString().substring(0, 10);
      // const dayOfMonth = date.getDate();
      if (!table[date]) {
        table[date] = { marked: true };
      }
    });
    setMeetupsTable((previous) => {
      return {
        ...previous,
        [currentYearAndMonth]: table,
      };
    });
  };
  useEffect(() => {
    if (currentYearAndMonth) {
      if (!meetupsTable[currentYearAndMonth]) {
        getUserMeetupsByYearAndMonth();
      }
    }
  }, [currentYearAndMonth]);

  const getUserMeetupsByDate = async () => {
    const result = await lampostAPI.get(
      `/meetupanduserrelationships/user/${props.route.params.userId}/date?datestring=${selectedDate}`
    );
    const { meetupAndUserRelationships } = result.data;
    setDateMeetups(meetupAndUserRelationships);
    // setIsFetchedDateMeetups(true);
  };
  useEffect(() => {
    if (selectedDate) {
      getUserMeetupsByDate();
    }
  }, [selectedDate]);

  const DayComponent = ({ date, marking }) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '100%',
          aspectRatio: 1,
          paddingRight: 2,
          paddingLeft: 2,
        }}
      >
        {marking ? (
          <TouchableOpacity
            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              setSelectedDate(date.dateString);
              selectedDateBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <Text style={{ fontSize: 18 }}>🔥</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={{ color: 'white', position: 'absolute', top: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {date.day}
        </Text>
      </View>
    );
  };

  const handleMonthChange = (monthObj) => {
    setCurrentYearAndMonth(`${monthObj.year}-${monthObj.month}`);
  };

  return (
    <LogContext.Provider
      value={{ selectedDateBottomSheetRef, selectedDate, setSelectedDate, dateMeetups, setDateMeetups }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Calendar
          style={{}}
          // horizontal={true}
          locale={'en'}
          markedDates={meetupsTable[currentYearAndMonth]}
          onMonthChange={handleMonthChange}
          dayComponent={DayComponent}
          theme={{
            calendarBackground: baseBackgroundColor,
            textSectionTitleColor: baseTextColor,
            dayTextColor: 'white',
            arrowColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            textMonthFontWeight: 'bold',
          }}
        />
      </View>
      <SelectedDateBottomSheet />
    </LogContext.Provider>
  );
};

export default LogContainer;
