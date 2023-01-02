import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import AddLinkOrBadgeTagsContext from './AddLinkOrBadgeTagsContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor, inputBackgroundColor } from '../../../utils/colorsTable';
import AddLink from './AddLink';
import AddBadgeTags from './AddBadgeTags';

const Container = (props) => {
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const { addBadgeTagsBottomSheetRef, setFetchedBadgeTags, setIsOpenCreateBadgeTagTextInput } = useContext(UserContext);
  const [addedBadgeTags, setAddedBadgeTags] = useState({});
  const [isOpenTextInput, setIsOpenTextInput] = useState(false);
  const [creatingBadgeTagNames, setCreatingBadgeTagNames] = useState([]);
  const [creatingBadgeTagText, setCreatingBadgeTagText] = useState('');

  // const renderBody = () => {
  //   if (addLinkOrBadgeTagsBottomSheetType === 'Add my link') {
  //     return <AddLink />;
  //   } else if (addLinkOrBadgeTagsBottomSheetType === 'Add badge tags') {
  //     return <AddBadgeTags />;
  //   }
  // };

  // const onClose = () => {
  //   setFetchedBadgeTags([]);
  // }

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addBadgeTagsBottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      enablePanDownToClose={false}
      // onClose={() => onClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => {
            setFetchedBadgeTags([]);
            setAddedBadgeTags({});
            setIsOpenCreateBadgeTagTextInput(false);
            setCreatingBadgeTagNames([]);
            setCreatingBadgeTagText('');
            addBadgeTagsBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='closecircleo' size={25} color={baseTextColor} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Close</Text>
          </View>
        </TouchableOpacity>
        <AddLinkOrBadgeTagsContext.Provider
          value={{
            addedBadgeTags,
            setAddedBadgeTags,
            isOpenTextInput,
            setIsOpenTextInput,
            creatingBadgeTagNames,
            setCreatingBadgeTagNames,
            creatingBadgeTagText,
            setCreatingBadgeTagText,
          }}
        >
          <AddBadgeTags />
          {/* {renderBody()} */}
        </AddLinkOrBadgeTagsContext.Provider>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
