import React, { useMemo, useContext } from 'react';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../../utils/colorsTable';
// import AppMenuButtons from './AppMenuBottomSheet/AppMenuButtons';
import { iconsTable } from '../../../../utils/icons';
const { MaterialCommunityIcons, AntDesign } = iconsTable;

const MenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['40%'], []);
  const { appMenuBottomSheetRef } = useContext(LoungeContext);
  const { isMenuBottomSheetOpen, setIsMenuBottomSheetOpen, setIsSendChatBottomSheetOpen, textInputRef, setChatType } =
    useContext(LoungeContext);

  if (isMenuBottomSheetOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={appMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // keyboardBehavior={'interactive'}
        onClose={() => setIsMenuBottomSheetOpen(false)}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
          {/* <AppMenuButtons /> */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              appMenuBottomSheetRef.current.close();
              setChatType('general');
              setIsSendChatBottomSheetOpen(true);
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: backgroundColorsTable['blue1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <MaterialCommunityIcons name='comment-text' size={20} color={iconColorsTable['blue1']} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Send a chat</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              appMenuBottomSheetRef.current.close();
              setChatType('question');
              setIsSendChatBottomSheetOpen(true);
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
                <AntDesign name='questioncircle' size={20} color={iconColorsTable['yellow1']} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Ask a question</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              appMenuBottomSheetRef.current.close();
              setChatType('help');
              setIsSendChatBottomSheetOpen(true);
              // sendChatBottomSheetRef.current.snapToIndex(0);
              // textInputRef.current.focus();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: backgroundColorsTable['red1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <AntDesign name='exclamationcircle' size={20} color={iconColorsTable['red1']} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Help!!!</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default MenuBottomSheet;
