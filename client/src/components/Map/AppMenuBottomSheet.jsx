import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { iconColorsTable, backgroundColorsTable } from '../../utils/colorsTable';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import AppButton from './AppButton';
import { setIsConfirmHostMeetupModalOpen } from '../../redux/actionCreators/modal';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['7%', '30%', '80%'], []);

  if (!props.hostMeetup.isOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={props.appMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
        )}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: 'rgb(54, 57, 63)' }}
        // keyboardBehavior={'interactive'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>
            What are you gonna do?
          </Text>
          <ScrollView style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} horizontal={true}>
            <AppButton
              backgroundColor={backgroundColorsTable['red1']}
              icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
              label='Launch'
            />
            <AppButton
              backgroundColor={backgroundColorsTable['grey1']}
              icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
              label='Camera'
            />
            <AppButton
              backgroundColor={backgroundColorsTable['green1']}
              icon={<MaterialCommunityIcons name='fire' size={35} color={iconColorsTable['green1']} />}
              label='Live'
            />

            <AppButton
              backgroundColor={backgroundColorsTable['violet1']}
              icon={<MaterialCommunityIcons name='history' size={35} color={iconColorsTable['violet1']} />}
              label='Timeline'
            />
            <AppButton
              backgroundColor={backgroundColorsTable['pink1']}
              icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
              label='Search'
            />
            {/* <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: backgroundColorsTable['red1'],
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
              onPress={() => props.setIsConfirmHostMeetupModalOpen(true)}
            >
              <MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />
            </TouchableOpacity> */}
          </ScrollView>
          <View></View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
