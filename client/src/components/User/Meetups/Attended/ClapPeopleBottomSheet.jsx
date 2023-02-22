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
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../Utils/ActionButton';
import lampostAPI from '../../../../apis/lampost';

// leadershipの方は、、、leader的資質だけに絞ろう。
// team management, time management, goal setting, planning, courage, integrity, dependability, creative, influence, active listening, flexibility

const INITIAL_PRAISING_SKILLS = {
  teamManagement: { label: 'Team management', value: 'teamManagement', clapped: 0 },
  timeManagement: { label: 'Time management', value: 'timeManagement', clapped: 0 },
  planning: { label: 'Planning', value: 'planning', clapped: 0 },
  courage: { label: 'Courage', value: 'courage', clapped: 0 },
  integrity: { label: 'Integrity', value: 'integrity', clapped: 0 },
  reliability: { label: 'Reliability', value: 'reliability', clapped: 0 },
  creative: { label: 'Creative', value: 'creative', clapped: 0 },
  activeListenning: { label: 'Active listenning ', value: 'activeListenning', clapped: 0 },
  flexibility: { label: 'Flexibility', value: 'flexibility', clapped: 0 },
  communication: { label: 'Communication', value: 'communication', clapped: 0 },
};

const INITIAL_CLAPPING_SKILLS = {
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
  criticalThinking: { label: '🤔 Critical thinking', value: 'criticalThinking', clapped: 0 },
};

const ClapPeopleBottomSheet = (props) => {
  const { auth, setSnackBar, setLoading } = useContext(GlobalContext);
  const { selectedUser, clapPeopleBottomSheetRef, launcher } = useContext(AttendedContext);
  const snapPoints = useMemo(() => ['85%'], []);
  const [clappingSkills, setClappingSkills] = useState(null);
  const [totalClapped, setTotalClapped] = useState(0);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [isClappingLauncher, setIsClappingLauncher] = useState(false);

  useEffect(() => {
    if (!totalClapped) {
      setIsDisabledSubmit(true);
    } else {
      setIsDisabledSubmit(false);
    }
  }, [totalClapped]);

  useEffect(() => {
    if (selectedUser) {
      if (selectedUser._id === launcher) {
        setClappingSkills(INITIAL_PRAISING_SKILLS);
        setIsClappingLauncher(true);
      } else {
        setClappingSkills(INITIAL_CLAPPING_SKILLS);
        setIsClappingLauncher(false);
      }
    }
  }, [selectedUser]);

  const onSubmitPress = async () => {
    const payload = {
      user: auth.data._id,
      clapped: selectedUser,
      skill: clappingSkills,
    };
    console.log(payload);
    setLoading(true);
    // const result = await lampostAPI.post('/claprelationships', {K:''});
    setLoading(false);
    setClappingSkills(null);
    setTotalClapped(0);
    setIsDisabledSubmit(true);
    clapPeopleBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your clap was sent successfully.',
      duration: 5000,
    });
  };

  const renderClappingSkill = () => {
    if (clappingSkills) {
      const skillSet = Object.values(clappingSkills);
      const renderingList = skillSet.map((skill, index) => {
        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Text style={{ color: baseTextColor, marginRight: 10 }}>{skill.label}</Text>
            <TouchableOpacity
              onPress={() => {
                setClappingSkills((previous) => {
                  const updating = { ...previous };
                  if (updating[skill.value].clapped === 3) {
                    // 3 points at most
                    updating[skill.value].clapped = 0;
                    setTotalClapped((previous) => previous - 3);
                  } else {
                    updating[skill.value].clapped++;
                    setTotalClapped((previous) => previous + 1);
                  }
                  return updating;
                });
              }}
            >
              <MaterialCommunityIcons
                name='hand-clap'
                color={skill.clapped > 0 ? iconColorsTable['yellow1'] : baseTextColor}
                size={27}
              />
            </TouchableOpacity>
            {skill.clapped > 0 ? (
              <Text style={{ color: iconColorsTable['yellow1'] }}>+{skill.clapped}</Text>
            ) : (
              <Text style={{ color: iconColorsTable['yellow1'] }}></Text>
            )}
          </View>
        );
      });

      return (
        <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          {renderingList}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={clapPeopleBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
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
        {selectedUser ? (
          <>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                backgroundColor: iconColorsTable['red1'],
                borderRadius: 5,
                padding: 5,
                marginRight: 10,
              }}
              onPress={() => {
                setClappingSkills(null);
                setTotalClapped(0);
                setIsDisabledSubmit(true);
                clapPeopleBottomSheetRef.current.close();
              }}
            >
              <MaterialCommunityIcons name='close' color='white' style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            {isClappingLauncher ? (
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
                  Did you enjoy this meetup?
                </Text>
                <Text style={{ color: 'white', marginBottom: 10 }}>
                  It requires a tons of work for launcher to organize a meetup. Let's upvote his skills.
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
                  How was your time with {selectedUser.name}?
                </Text>
                <Text style={{ color: baseTextColor, marginBottom: 10 }}>
                  You can praise his/her traits, personalities and skills.
                </Text>
              </View>
            )}
            <BottomSheetScrollView>{renderClappingSkill()}</BottomSheetScrollView>
            <View style={{ alignSelf: 'center' }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: isDisabledSubmit ? screenSectionBackgroundColor : iconColorsTable['blue1'],
                  borderRadius: 10,
                }}
                disabled={isDisabledSubmit}
                onPress={() => onSubmitPress()}
              >
                {isDisabledSubmit ? (
                  <MaterialCommunityIcons name='emoticon-poop' size={25} color={'white'} style={{ marginRight: 10 }} />
                ) : (
                  <MaterialCommunityIcons name='check' size={25} color={'white'} style={{ marginRight: 10 }} />
                )}
                <Text style={{ color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ClapPeopleBottomSheet;
