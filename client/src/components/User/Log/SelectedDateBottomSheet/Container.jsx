import React, { useMemo, useContext, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import LogContext from '../LogContext';
import MeetupContext from './Meetup/MeetupContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';
import Meetup from './Meetup/Container';
import Header from './Meetup/Header';
import MyImpression from './Meetup/MyImpression';
import ActionButtons from './Meetup/ActionButtons';

const Container = () => {
  const snapPoints = useMemo(() => ['60%'], []);
  const { selectedDateBottomSheetRef, selectedDate, setSelectedDate, dateMeetups, setDateMeetups } =
    useContext(LogContext);

  const renderItem = useCallback((meetupObject) => {
    return (
      <MeetupContext.Provider value={{ meetupObject }}>
        <View style={{ marginBottom: 10 }}>
          <Header />
          <MyImpression />
          <ActionButtons />
        </View>
      </MeetupContext.Provider>
    );
  }, []);

  console.log(dateMeetups);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={selectedDateBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {dateMeetups.length ? (
          <FlatList
            data={dateMeetups}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        ) : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
