import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import ActionButton from '../../Utils/ActionButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SelectedAssetBottomSheet = (props) => {
  const { selectedAssetBottomSheetRef, selectedAsset, addNewReactionBottomSheetRef } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['65%', '80%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={selectedAssetBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {selectedAsset ? (
            <View>
              <FastImage
                style={{ width: '100%', height: undefined, aspectRatio: 1, marginBottom: 10 }}
                source={{
                  uri: selectedAsset.data,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              {/* <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <ActionButton
                  label='Add new reaction'
                  icon={<SimpleLineIcons name='emotsmile' size={25} color={'white'} />}
                  backgroundColor={iconColorsTable['blue1']}
                  onActionButtonPress={() => addNewReactionBottomSheetRef.current.snapToIndex(0)}
                />
              </View> */}
            </View>
          ) : null}
        </ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SelectedAssetBottomSheet;
