import React, { useState, useContext, useMemo, useEffect } from 'react';
import LibrariesContext from '../LibrariesContext';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor, sectionBackgroundColor } from '../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import UserInfo from '../../Utils/UserInfo';

const MembersBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { membersBottomSheetRef, setLibraryMembers, libraryMembers } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const renderMembers = () => {
    if (libraryMembers.length) {
      const membersList = libraryMembers.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => {
              if (!auth.data || auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <UserInfo user={user} />
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ backgroundColor: sectionBackgroundColor, padding: 5, borderRadius: 10 }}>{membersList}</View>
      );
    } else if (libraryMembers.length === 0) {
      return <Text style={{ color: 'white' }}>No users now...</Text>;
    } else {
      return <Text style={{ color: 'white' }}>Now loading the data...</Text>;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={membersBottomSheetRef}
      snapPoints={snapPoints}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => setLibraryMembers([])}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15, color: 'white' }}>Members</Text>
          <Text style={{ color: baseTextColor }}>These people attend this meetup. Feel free to join!</Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          {renderMembers()}
        </ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MembersBottomSheet;
