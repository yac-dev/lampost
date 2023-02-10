import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LoungeContext from './LoungeContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const SelectedChatActionBottomSheet = () => {
  const snapPoints = useMemo(() => ['40%'], []);
  const { meetup, navigation, selectedChatBottomSheetRef, selectedChat, setSelectedChat } = useContext(LoungeContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={selectedChatBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ color: 'red' }}>Chat menu</Text>
        <TouchableOpacity style={{ color: 'red' }}>
          <Text>Reply this chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ color: 'red' }}>
          <Text>Report this chat</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SelectedChatActionBottomSheet;
