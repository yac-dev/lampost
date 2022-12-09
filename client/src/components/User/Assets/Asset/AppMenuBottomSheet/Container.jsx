import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import AssetContext from '../../AssetContext';
import { connect } from 'react-redux';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import AppMenuButtons from './AppMenuButtons';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { appBottomSheetBackgroundColor } from '../../../../../utils/colorsTable';

const AppMenuBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, isMyPage } = useContext(AssetContext);

  const snapPoints = useMemo(() => ['8%', '30%'], []);

  // ここに関しては、authじゃない限り、表示しないようにする。
  if (!auth.data || !isMyPage) {
    return null;
  } else {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={appMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
        )}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // keyboardBehavior={'interactive'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>Tag more people?</Text>
          <AppMenuButtons />
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AppMenuBottomSheet);
