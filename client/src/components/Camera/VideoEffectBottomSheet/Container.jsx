import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
// import AddAssetEffect from './AddAssetEffectMenu/Container';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { iconsTable } from '../../../utils/icons';

const AppMenuBottomSheet = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, videoEffectBottomSheetRef, videoEffect, setVideoEffect } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={videoEffectBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <Text style={{ color: baseTextColor, marginBottom: 15 }}>
          Note: These video effects will be added after your recording finishes.
        </Text>
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                setVideoEffect('normal');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: backgroundColorsTable['blue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Ionicons name='videocam' size={20} color={iconColorsTable['blue1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>2023 normal</Text>
              </View>
              {videoEffect === 'normal' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setVideoEffect('ocean')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: backgroundColorsTable['lightBlue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['lightBlue1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>
                  8mm Ocean film
                </Text>
              </View>
              {videoEffect === 'ocean' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setVideoEffect('olive')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: backgroundColorsTable['lightGreen1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['lightGreen1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>
                  8mm Olive film
                </Text>
              </View>
              {videoEffect === 'olive' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setVideoEffect('camel')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: backgroundColorsTable['pink1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['pink1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>
                  8mm Camel film
                </Text>
              </View>
              {videoEffect === 'camel' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setVideoEffect('sepia')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: backgroundColorsTable['yellow1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['yellow1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>
                  8mm Sepia film
                </Text>
              </View>
              {videoEffect === 'sepia' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
