// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import BS, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import NativeBaseProvider from '../../Utils/NativeBaseProvider';
import Form from './Form';

// ac
import { setIsBottomSheetOpen } from '../../../redux/actionCreators/modal';

const BottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '50%'];

  return (
    <BS
      enableOverDrag={true}
      ref={props.bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => props.setIsBottomSheetOpen(false)}
    >
      <BottomSheetView>
        {/* <NativeBaseProvider>
          <Form />
        </NativeBaseProvider> */}
        <ScrollView>
          <TextInput
            style={{ height: 200, borderWidth: 1 }}
            multiline={true}
            numberOfLines={10}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder='useless placeholder'
            keyboardType='numeric'
          />
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
          <View>
            <Text>HIHI</Text>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BS>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsBottomSheetOpen })(BottomSheet);
