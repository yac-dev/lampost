import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../utils/colorsTable';
import AppMenuButtons from './AppMenuBottomSheet/AppMenuButtons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../../apis/lampost';

const AppMenuBottomSheet = (props) => {
  const {
    appMenuBottomSheetRef,
    library,
    selectedRoll,
    setSelectedRoll,
    isMenuTapped,
    setIsMenuTapped,
    postsBottomSheetRef,
    navigation,
    libraryId,
    libraryAssetType,
  } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['45%'], []);
  // const snapPoints = ['30%'];

  if (isMenuTapped) {
    return (
      <GorhomBottomSheet
        index={0}
        // enableOverDrag={true}
        ref={appMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // keyboardBehavior={'interactive'}
        onClose={() => setIsMenuTapped(false)}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              // setIsConfirmPostAssetsModalOpen(true);
              appMenuBottomSheetRef.current.close();
              navigation.navigate('Post my snap', {
                libraryId,
                fromComponent: 'ADD_ASSET_FOR_POSTING',
                assetType: libraryAssetType,
              });
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
                <MaterialCommunityIcons name='plus' color={iconColorsTable['blue1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Post my snap</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              appMenuBottomSheetRef.current.close();
              navigation.navigate('Members', { libraryId });
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
                <MaterialCommunityIcons name='account-group' color={iconColorsTable['blue1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Members</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              // navigation.navigate('LibraryMembers', { libraryId });
              appMenuBottomSheetRef.current.close();
              navigation.navigate('Invite my friends', { libraryId });
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
                <MaterialCommunityIcons name='account-group' color={iconColorsTable['blue1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
                Invite my friends
              </Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              navigation.navigate('LibraryMembers', { libraryId });
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
                <MaterialCommunityIcons name='account-group' color={iconColorsTable['blue1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Library detail</Text>
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

export default AppMenuBottomSheet;
