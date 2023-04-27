import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../GlobalContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../utils/colorsTable';
import { iconsTable } from '../utils/icons';
import FastImage from 'react-native-fast-image';

const UserMenuBottomSheet = (props) => {
  const { MaterialCommunityIcons, Fontisto, Foundation, Ionicons } = iconsTable;
  const { auth, isIpad, userMenuBottomSheetRef, navigation } = useContext(GlobalContext);
  const snapPoints = useMemo(() => ['60%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={userMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {auth.isAuthenticated ? (
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>Account menu</Text>
            <ScrollView>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  userMenuBottomSheetRef.current.close();
                  // navigation.navigate('My friends');
                  navigation.navigate('Profile', { userId: auth.data._id });
                  // console.log('move to history');
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
                    <MaterialCommunityIcons name='account' color={iconColorsTable['blue1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>My profile</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  userMenuBottomSheetRef.current.close();
                  // navigation.navigate('My friends');
                  navigation.navigate('My log', { userId: auth.data._id });
                  // console.log('move to history');
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
                    <MaterialCommunityIcons name='history' color={iconColorsTable['yellow1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>My log</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  userMenuBottomSheetRef.current.close();
                  navigation.navigate('My friends');
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: backgroundColorsTable['pink1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  >
                    <MaterialCommunityIcons name='human-greeting-variant' color={iconColorsTable['pink1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>My friends</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  userMenuBottomSheetRef.current.close();
                  // navigation.navigate('My friends');
                  navigation.navigate('Assets', { userId: auth.data._id });
                  // console.log('my moments');
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: backgroundColorsTable['grey1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  >
                    <Ionicons name='camera' color={iconColorsTable['grey1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>My snaps</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  setIsConfirmLogoutModalOpen(true);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: backgroundColorsTable['green1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  >
                    <MaterialCommunityIcons name='exit-run' color={iconColorsTable['green1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Logout</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  // appMenuBottomSheetRef.current.close();
                  // navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
                  console.log('delete my account');
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
                    <Foundation name='alert' color={iconColorsTable['red1']} size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Delete my account</Text>
                </View>
                <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}
              onPress={() => {
                // setIsConfirmLogoutModalOpen(true);
                console.log('signup');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['green1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='exit-run' color={iconColorsTable['green1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Signup</Text>
              </View>
              <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}
              onPress={() => {
                // appMenuBottomSheetRef.current.close();
                // navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
                console.log('delete my account');
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
                  <Foundation name='alert' color={iconColorsTable['red1']} size={20} />
                </View>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Login</Text>
              </View>
              <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default UserMenuBottomSheet;
