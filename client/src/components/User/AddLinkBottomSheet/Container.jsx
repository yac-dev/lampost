import React, { useMemo, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
  sectionBackgroundColor,
} from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  inputBackgroundColor,
  iconColorsTable,
} from '../../../utils/colorsTable';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../Utils/ActionButton';
import lampostAPI from '../../../apis/lampost';

const Container = () => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { auth } = useContext(GlobalContext);
  const { addLinkBottomSheetRef, pressedBadgeData, setPressedBadgeData, setBadgeDatas } = useContext(UserContext);
  const [linkText, setLinkText] = useState('');
  const inputAccessoryViewID = 'ADD_LINK';

  const onDonePress = async () => {
    const result = await lampostAPI.patch(
      `/badgeanduserrelationships/link/${pressedBadgeData.badge._id}/${auth.data._id}`,
      {
        linkText,
      }
    );
    const { badgeId, link } = result.data;
    setPressedBadgeData((previous) => {
      return {
        ...previous,
        link: link,
      };
    });
    setBadgeDatas((previous) => {
      const updating = [...previous];
      for (let i = 0; i < updating.length; i++) {
        if (updating[i].badge._id === badgeId) {
          updating[i].link = link;
        }
      }
      return updating;
    });
    setLinkText('');
    Keyboard.dismiss();
    addLinkBottomSheetRef.current.close();
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addLinkBottomSheetRef}
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
            addLinkBottomSheetRef.current.close();
            Keyboard.dismiss();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='closecircleo' size={25} color={baseTextColor} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Close</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Add link</Text>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>Please type your personal link.</Text>
        <BottomSheetTextInput
          placeholder='e.g. https://youtube.com/@mychannel'
          placeholderTextColor={baseTextColor}
          style={{
            padding: 10,
            backgroundColor: inputBackgroundColor,
            borderRadius: 10,
            marginBottom: 25,
            color: baseTextColor,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          value={linkText}
          onChangeText={(text) => setLinkText(text)}
          mode='outlined'
          autoCapitalize='none'
        />
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <ActionButton
            label='Done'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='check' size={25} color='white' />}
            onActionButtonPress={() => onDonePress()}
          />
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
