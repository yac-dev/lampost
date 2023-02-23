import React, { useMemo, useContext, useState } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  backgroundColorsTable,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';
import { ScrollView } from 'react-native-gesture-handler';

const FlagUserMenuBottomSheet = () => {
  const [numCols, setColumnNo] = useState(3);
  const snapPoints = useMemo(() => ['60%'], []);
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { user, navigation, leadershipBottomSheetRef } = useContext(UserContext);

  // まじで使いづレーナ。flatlist
  const renderLeadershipSkills = () => {
    if (!Object.values(user.leadership).length) {
      return null;
    } else {
      const skillsList = [];
      for (const skill in user.leadership) {
        skillsList.push({ skill: skill, totalVotes: user.leadership[skill] });
      }
      const renderingList = skillsList.map((skill, index) => {
        return (
          <View
            key={index}
            style={{
              padding: 10,
              backgroundColor: screenSectionBackgroundColor,
              flexDirection: 'row',
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', marginRight: 10 }}>{skill.skill}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{skill.totalVotes}</Text>
          </View>
        );
      });

      return (
        // <ScrollView horizontal={true}>
        <View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name='star' color={iconColorsTable['yellow1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Skills</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderingList}</View>
        </View>
        // </ScrollView>
      );
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={leadershipBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['pink1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='hand-heart' color={iconColorsTable['pink1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Patrons</Text>
            <Text style={{ color: 'white', fontSize: 17 }}>{user.patrons}</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        {renderLeadershipSkills()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default FlagUserMenuBottomSheet;
