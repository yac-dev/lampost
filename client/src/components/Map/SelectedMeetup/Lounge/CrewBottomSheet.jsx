import React, { useMemo, useContext } from 'react';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const CrewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const { meetup, navigation, crewBottomSheetRef } = useContext(LoungeContext);

  const renderCrew = () => {
    if (meetup) {
      const crewList = meetup.attendees.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 0.3,
              borderBottomColor: '#ABABAB',
            }}
            onPress={() => {
              if (props.auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                marginRight: 20,
                padding: 5,
                borderRadius: 7,
                width: 50,
                height: 50,
                alignItems: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' color='white' size={35} />
            </View>
            <View>
              <Text style={{ color: 'rgb(160,160,160)' }}>{user.name}</Text>
              <Text>Badges</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{crewList}</View>;
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={crewBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>Crew</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderCrew()}</ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(CrewBottomSheet);
