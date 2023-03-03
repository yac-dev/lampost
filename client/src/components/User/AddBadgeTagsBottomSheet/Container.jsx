import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor, inputBackgroundColor } from '../../../utils/colorsTable';
import AddBadgeTags from './AddBadgeTags';

const Container = (props) => {
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const { addBadgeTagsBottomSheetRef, setFetchedBadgeTags, setIsOpenCreateBadgeTagTextInput } = useContext(UserContext);
  const [addedBadgeTags, setAddedBadgeTags] = useState({});
  const [isOpenTextInput, setIsOpenTextInput] = useState(false);
  const [creatingBadgeTagNames, setCreatingBadgeTagNames] = useState([]);
  const [creatingBadgeTagText, setCreatingBadgeTagText] = useState('');
  const [badgeTagOptions, setBadgeTagOptions] = useState({});
  const [isFetchedBadgeTagOptions, setIsFetchedBadgeTagOptions] = useState(false);

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
      <BottomSheetView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
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
        <AddBadgeTagsContext.Provider
          value={{
            addedBadgeTags,
            setAddedBadgeTags,
            isOpenTextInput,
            setIsOpenTextInput,
            creatingBadgeTagNames,
            setCreatingBadgeTagNames,
            creatingBadgeTagText,
            setCreatingBadgeTagText,
            badgeTagOptions,
            setBadgeTagOptions,
            isFetchedBadgeTagOptions,
            setIsFetchedBadgeTagOptions,
          }}
        >
          <AddBadgeTags />
        </AddBadgeTagsContext.Provider>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
