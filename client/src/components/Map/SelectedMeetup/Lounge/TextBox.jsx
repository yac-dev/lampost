import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsTextBoxBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const TextBox = (props) => {
  const snapPoints = ['65%', '85%', '100%'];
  const textInputRef = useRef(null);
  const inputAccessoryViewID = '111111111';
  const [content, setContent] = useState('');

  const onTextBoxBottomSheetClose = () => {
    if (props.bottomSheet.textBox.isOpen) {
      props.setIsTextBoxBottomSheetOpen(false);
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.textBoxBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      onClose={() => onTextBoxBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <BottomSheetTextInput
          placeholder='Write your message' // ここを、bottom sheetのmax分に広げる。
          inputAccessoryViewID={inputAccessoryViewID}
          style={{ flex: 1, borderRadius: 10 }}
          ref={textInputRef}
          value={content}
          onChangeText={setContent}
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsTextBoxBottomSheetOpen })(TextBox);
