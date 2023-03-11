import React, { useMemo, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';

const FlagUserMenuBottomSheet = () => {
  const snapPoints = useMemo(() => ['30%'], []);
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { activitiesMenuBottomSheetRef, navigation, user } = useContext(UserContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={activitiesMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between' }}
          onPress={() => {
            activitiesMenuBottomSheetRef.current.close();
            navigation.navigate('Meetups', { userId: user._id });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['red1'],
                borderRadius: 8,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='rocket-launch' size={20} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ color: 'white' }}>{user.name}'s meetups</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between' }}
          onPress={() => {
            activitiesMenuBottomSheetRef.current.close();
            navigation.navigate('Assets', { userId: user._id });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['violet1'],
                borderRadius: 8,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='film' size={20} color={iconColorsTable['violet1']} />
            </View>
            <Text style={{ color: 'white' }}>{user.name}'s assets</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between' }}
          onPress={() => {
            activitiesMenuBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['yellow1'],
                borderRadius: 8,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='hand-clap' size={20} color={iconColorsTable['yellow1']} />
            </View>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>{user.name}'s claps</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default FlagUserMenuBottomSheet;
