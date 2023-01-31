import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import { connect } from 'react-redux';
// import UserContext from './Context';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AppButtons from './AppMenuButtons';
import MyConnections from './MyConnections/Container';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const AppMenuBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, isMyPage } = useContext(UserContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const snapPoints = useMemo(() => ['10%', '30%', '80%'], []);
  // ここに関しては、authじゃない限り、表示しないようにする。
  if (!auth.isAuthenticated || !isMyPage) {
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
        <BottomSheetView
          style={{
            paddingLeft: isIpad ? 35 : 20,
            paddingRight: isIpad ? 35 : 20,
            paddingTop: isIpad ? 15 : 5,
            flex: 1,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: isIpad ? 35 : 20, color: 'white', marginBottom: isIpad ? 35 : 20 }}
          >
            Add badges?
          </Text>
          <AppButtons />
          <MyConnections />
          {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, marginBottom: 15 }}>
            <TouchableOpacity onPress={() => handleCreateLibraryBottomSheet()}>
              <MaterialIcons name='create-new-folder' size={40} />
              <Text>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name='images' size={40} />
              <Text>Search</Text>
            </TouchableOpacity>
          </View> */}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AppMenuBottomSheet);
