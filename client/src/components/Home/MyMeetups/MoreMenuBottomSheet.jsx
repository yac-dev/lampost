import React, { useContext, useMemo } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, Feather } = iconsTable;

const MoreMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['40%'], []);
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { moreMenuBottomSheetRef, navigation, moreMenu } = useContext(MyMeetupsContext);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={moreMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {moreMenu && auth.data._id === moreMenu.launcher ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
            onPress={() => {
              topLevelHomeNavigation.navigate('Edit meetup', { meetupId: moreMenu._id });
              moreMenuBottomSheetRef.current.close();
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
                <MaterialCommunityIcons name='file-document-edit-outline' color={iconColorsTable['green1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Edit meetup</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            moreMenuBottomSheetRef.current.close();
            topLevelHomeNavigation.navigate('Meetup members', { meetupId: moreMenu._id });
            // navigation.navigate('MembersNavigator', { screen: 'Members', params: { meetupId: moreMenu._id } });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['orange1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='account-group' color={iconColorsTable['orange1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Members</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            topLevelHomeNavigation.navigate('Lounge', { meetupId: moreMenu });
            moreMenuBottomSheetRef.current.close();
          }}
          // disabled={true}
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
              <Feather name='navigation' color={iconColorsTable['lightBlue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Meetup Detail</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MoreMenuBottomSheet;
