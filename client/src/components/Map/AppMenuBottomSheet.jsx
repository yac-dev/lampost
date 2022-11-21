import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { setIsConfirmHostMeetupModalOpen } from '../../redux/actionCreators/modal';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['10%', '30%'], []);

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
        backgroundStyle={{ backgroundColor: 'rgb(50, 78, 165)' }}
        // keyboardBehavior={'interactive'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>What are you gonna do?</Text>
          <TouchableOpacity onPress={() => props.setIsConfirmHostMeetupModalOpen(true)}>
            <MaterialCommunityIcons name='rocket-launch' size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name='camera' size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name='fire' size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name='history' size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name='map-search-outline' size={40} />
          </TouchableOpacity>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
