import React, { useMemo, useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AttendedContext from './AttendedContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import lampostAPI from '../../../../apis/lampost';
import { iconsTable } from '../../../../utils/icons';

const INITIAL_CLAPPING_LEADERSHIP = {
  teamManagement: { label: 'Team management', value: 'teamManagement', clapped: 0 },
  timeManagement: { label: 'Time management', value: 'timeManagement', clapped: 0 },
  planning: { label: 'Planning', value: 'planning', clapped: 0 },
  courage: { label: 'Courage', value: 'courage', clapped: 0 },
  integrity: { label: 'Integrity', value: 'integrity', clapped: 0 },
  reliability: { label: 'Reliability', value: 'reliability', clapped: 0 },
  creative: { label: 'Creative', value: 'creative', clapped: 0 },
  flexibility: { label: 'Flexibility', value: 'flexibility', clapped: 0 },
  communication: { label: 'Communication', value: 'communication', clapped: 0 },
  relationshipBuilding: { label: 'Relationship building', value: 'relationshipBuilding', clapped: 0 },
  mentoring: { label: 'Mentoring', value: 'mentoring', clapped: 0 },
};

const INITIAL_CLAPPING_PERSONALITY = {
  considerate: { label: '🥰 Considerate', value: 'considerate', clapped: 0 },
  communication: { label: '😁 Communication', value: 'communication', clapped: 0 },
  openMinded: { label: '🤗 Open-minded', value: 'openMinded', clapped: 0 },
  spontaneous: { label: '💪 Spontaneous', value: 'spontaneous', clapped: 0 },
  diversity: { label: '🌎 Diversity', value: 'diversity', clapped: 0 },
  passionate: { label: '🔥 Passionate', value: 'passionate', clapped: 0 },
  hardWorking: { label: '👊 Hard-work', value: 'hardWorking', clapped: 0 },
  concentration: { label: '✍️ Concentration', value: 'concentration', clapped: 0 },
  calmAndRelaxed: { label: '😌 Calm & Relaxed', value: 'calmAndRelaxed', clapped: 0 },
  respectful: { label: '🙏 Respectful', value: 'respectful', clapped: 0 },
  teamWorking: { label: '🤝 Team-working', value: 'teamWorking', clapped: 0 },
  adaptivity: { label: '🙌 Adaptivity', value: 'adaptivity', clapped: 0 },
};

const ActionButtonBottomSheet = (props) => {
  const { MaterialCommunityIcons, Foundation } = iconsTable;
  const { auth, setSnackBar, setLoading } = useContext(GlobalContext);
  const { selectedUser, setSelectedUser, actionButtonBottomSheetRef, launcherId, myFriends, setMyFriends, navigation } =
    useContext(AttendedContext);
  const snapPoints = useMemo(() => ['40%'], []);

  // const onSubmitPress = async () => {
  //   const shallowCopy = { ...clappingTraits };
  //   for (const trait in shallowCopy) {
  //     shallowCopy[trait] = shallowCopy[trait].clapped;
  //   }
  //   const payload = {
  //     userId: auth.data._id,
  //     clappedUserId: selectedUser._id,
  //     traits: shallowCopy,
  //   };
  //   setLoading(true);
  //   if (isClappingLauncher) {
  //     const result = await lampostAPI.post('/claps/leadership', payload);
  //     // console.log('clapping leadership.', payload);
  //   } else {
  //     const result = await lampostAPI.post('/claps/personality', payload);
  //     // console.log('clapping personlity.', payload);
  //   }
  //   setLoading(false);
  //   setClappingTraits({});
  //   setSelectedUser(null);
  //   setTotalClapped(0);
  //   setIsDisabledSubmit(true);
  //   clapPeopleBottomSheetRef.current.close();
  //   setSnackBar({
  //     isVisible: true,
  //     barType: 'success',
  //     message: 'Your clap was sent successfully.',
  //     duration: 5000,
  //   });
  // };

  const addFriend = async (user) => {
    const payload = {
      friendId: user._id,
      launcherId: props.route.params.launcher,
    };
    setLoading(true);
    const result = await lampostAPI.post(`/friendrelationships/${auth.data._id}`, payload);
    const { friendId } = result.data;
    console.log(payload);
    setMyFriends((previous) => {
      return {
        ...previous,
        [friendId]: friendId,
      };
    });
    setLoading(false);
  };

  const renderActionButtons = () => {
    if (selectedUser) {
      console.log(selectedUser._id, launcherId);
      if (selectedUser._id === launcherId) {
        return (
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                actionButtonBottomSheetRef.current.close();
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['pink1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='hand-heart' color={iconColorsTable['pink1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Support {selectedUser.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                actionButtonBottomSheetRef.current.close();
                addFriend(selectedUser);
              }}
              disabled={myFriends[selectedUser._id] ? true : false}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['orange1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='human-greeting-variant' color={iconColorsTable['orange1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>
                  Be friend with {selectedUser.name}
                </Text>
              </View>
              {myFriends[selectedUser._id] ? <Text>Already friended</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                actionButtonBottomSheetRef.current.close();
                navigation.navigate('Clap friend', {
                  userId: selectedUser._id,
                  launcherId,
                });
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['yellow1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='hand-clap' color={iconColorsTable['yellow1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Clap {selectedUser.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                actionButtonBottomSheetRef.current.close();
                addFriend(selectedUser);
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['orange1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='human-greeting-variant' color={iconColorsTable['orange1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>
                  Be friend with {selectedUser.name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                actionButtonBottomSheetRef.current.close();
                navigation.navigate('Clap friend', {
                  userId: selectedUser._id,
                  launcherId,
                });
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['yellow1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='hand-clap' color={iconColorsTable['yellow1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Clap {selectedUser.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={actionButtonBottomSheetRef}
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
      <BottomSheetView
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}
      >
        {renderActionButtons()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ActionButtonBottomSheet;
