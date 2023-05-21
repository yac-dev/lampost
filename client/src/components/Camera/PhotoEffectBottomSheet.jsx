import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
// import AddAssetEffect from './AddAssetEffectMenu/Container';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { iconsTable } from '../../utils/icons';

const AppMenuBottomSheet = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, photoEffectBottomSheetRef, photoEffect, setPhotoEffect } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={photoEffectBottomSheetRef}
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
          Note: Photo effect will be added after taking picture.
        </Text>
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => {
                setPhotoEffect('normal');
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
                  <Ionicons name='image' size={20} color={iconColorsTable['blue1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>2023 normal</Text>
              </View>
              {photoEffect === 'normal' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setPhotoEffect('rose')}
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
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['pink1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>1980's rose</Text>
              </View>
              {photoEffect === 'rose' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setPhotoEffect('ocean')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['lightBlue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['lightBlue1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>1980's ocean</Text>
              </View>
              {photoEffect === 'ocean' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setPhotoEffect('olive')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['lightGreen1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['lightGreen1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>1980's olive</Text>
              </View>
              {photoEffect === 'olive' ? (
                <Ionicons name='checkmark-circle' size={25} color={iconColorsTable['green1']} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
              onPress={() => setPhotoEffect('dandelion')}
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
                  <MaterialCommunityIcons name='video-vintage' size={20} color={iconColorsTable['yellow1']} />
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
                  1980's dandelion
                </Text>
              </View>
              {photoEffect === 'dandelion' ? (
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
