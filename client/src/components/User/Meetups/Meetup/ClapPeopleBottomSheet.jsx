import React, { useMemo, useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MeetupContext from './MeetupContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../Utils/ActionButton';

// leadershipの方は、、、leader的資質だけに絞ろう。
// team management, time management, goal setting, planning, courage, integrity, dependability, creative, influence, active listening, flexibility

const INITIAL_PRAISED_SKILL = {
  teamManagement: { label: 'Launcher has great team management skill.', value: 'teamManagement', clapped: 0 },
  timeManagement: { label: 'Launcher has great time management skill.', value: 'timeManagement', clapped: 0 },
  planning: { label: 'Launcher has great planning skill.', value: 'planning', clapped: 0 },
  courage: { label: 'Launcher is courage.', value: 'courage', clapped: 0 },
  integrity: { label: 'Launcher has great integrity.', value: 'integrity', clapped: 0 },
  dependability: { label: 'Launcher is a dependable person.', value: 'dependability', clapped: 0 },
  creative: { label: 'Launcher is a creative person.', value: 'creative', clapped: 0 },
  activeListenning: { label: 'Launcher ' },
  influence: {},
  flexibility: { label: 'Launcher is a flexible person.', value: 'flexible', clapped: 0 },
};

const INITIAL_CLAPPED_SKILLS = {
  considerate: { label: 'He/She is a considerate person🥰', value: 'considerate', clapped: 0 },
  communication: { label: 'He/She has effective communication skills👍', value: 'communication', clapped: 0 },
  openMinded: { label: 'He/She is an open-minded person🤗', value: 'openMinded', clapped: 0 },
  spontaneous: { label: 'He/She is a spontaneous person📢', value: 'spontaneous', clapped: 0 },
  diversity: { label: 'He/She is a diverse person🌎', value: 'diversity', clapped: 0 },
  passionate: { label: 'He/She is passionate about what he/she does🔥', value: 'passionate', clapped: 0 },
  hardWorking: { label: 'He/She is a hard-working person🔥', value: 'hardWorking', clapped: 0 },
  concentration: { label: 'He/She has great concentration✍️', value: 'concentration', clapped: 0 },
  calmAndRelaxed: { label: 'He/She is calm and relaxed person😌', value: 'calmAndRelaxed', clapped: 0 },
  respectful: { label: 'He/She is a respectful person🙏', value: 'respectful', clapped: 0 },
  teamWorking: { label: 'He/She has great team working skills🤝', value: 'teamWorking', clapped: 0 },
  adaptivity: { label: 'He/She is adaptable🙌', value: 'adaptivity', clapped: 0 },
  empathy: { label: 'He/She makes efforts to empathize with anybody❤️', value: 'empathy', clapped: 0 },
  criticalThinking: { label: 'He/She has good critical thinking skills🤔', value: 'criticalThinking', clapped: 0 },
};

const ClapPeopleBottomSheet = (props) => {
  const { selectedUser, clapPeopleBottomSheetRef, fetchedMeetup } = useContext(MeetupContext);
  const [clappedSkills, setClappedSkills] = useState(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const [totalClapped, setTotalClapped] = useState(0);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  useEffect(() => {
    if (!totalClapped) {
      setIsDisabledSubmit(true);
    } else {
      setIsDisabledSubmit(false);
    }
  }, [totalClapped]);

  useEffect(() => {
    if (selectedUser) {
      if (selectedUser._id === fetchedMeetup.launcher) {
        setClappedSkills(INITIAL_CLAPPED_SKILLS);
      } else {
        setClappedSkills(INITIAL_PRAISED_SKILL);
      }
    }
  }, [selectedUser]);

  const renderClapSkill = () => {
    const skillsList = Object.values(clappedSkills);
    const renderingList = skillsList.map((skill, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginBottom: 5 }}>
          <Text style={{ color: baseTextColor, marginRight: 10 }}>{skill.label}</Text>
          <TouchableOpacity
            onPress={() => {
              setClappedSkills((previous) => {
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
              size={25}
            />
          </TouchableOpacity>
          {skill.clapped > 0 ? <Text style={{ color: iconColorsTable['yellow1'] }}>+{skill.clapped}</Text> : null}
        </View>
      );
    });

    return <View style={{ padding: 5 }}>{renderingList}</View>;
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
                setClappedSkills(INITIAL_CLAPPED_SKILLS);
                setTotalClapped(0);
                setIsDisabledSubmit(true);
                clapPeopleBottomSheetRef.current.close();
              }}
            >
              <MaterialCommunityIcons name='close' color='white' style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
              How was your time with {selectedUser.name}?
            </Text>
            <BottomSheetScrollView>{renderClapSkill()}</BottomSheetScrollView>
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
