import React, { useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const BadgeFolderBottomSheet = (props) => {
  const snapPoints = ['60%', '100%'];

  const renderRolls = () => {
    if (props.rolls.length) {
      console.log(props.rolls);
      const rollsList = props.rolls.map((roll, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ borderBottomWidth: 0.3, borderBottomColor: 'rgb(178, 178, 178)', padding: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/app/icons8-film-roll-100.png')}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10 }}>{roll.name}</Text>
              <Text>{roll.assets.length} assets</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../../../../assets/freeAssets/anh-nguyen-kcA-c3f_3FE-unsplash.jpg')}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
              />
              <Image
                source={require('../../../../assets/freeAssets/bence-boros-8T5UAV6KkZA-unsplash.jpg')}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
              />
              <Image
                source={require('../../../../assets/freeAssets/danial-igdery-FCHlYvR5gJI-unsplash.jpg')}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
              />
              <Image
                source={require('../../../../assets/freeAssets/james-harrison-vpOeXr5wmR4-unsplash.jpg')}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
              />
              <Image
                source={require('../../../../assets/freeAssets/kelly-sikkema-sK0dKnDOcEM-unsplash.jpg')}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
              />
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{rollsList}</View>;
    } else {
      return <Text>Now loading...</Text>;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.rollsBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView>
        {/* {props.selected ? <Text>{props.selected.name}</Text> : null} */}
        <Text>Rolls</Text>
        {renderRolls()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default BadgeFolderBottomSheet;
