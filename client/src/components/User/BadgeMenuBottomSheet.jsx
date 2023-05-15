import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity, Platform, FlatList } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';

const BadgeBottomSheet = () => {
  const { MaterialCommunityIcons, Foundation, Ionicons, AntDesign } = iconsTable;
  const { auth, isIpad, unreadFriendChats, setUnreadFriendChats, setFriendChatsNotificationCount } =
    useContext(GlobalContext);
  const { badgeMenuBottomSheetRef, navigation, userBadges } = useContext(UserContext);
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={badgeMenuBottomSheetRef}
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
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            badgeMenuBottomSheetRef.current.close();
            navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: userBadges });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['red1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='plus' color={iconColorsTable['red1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Add badges</Text>
          </View>
          <Text style={{ color: baseTextColor }}>Do this first of all</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            badgeMenuBottomSheetRef.current.close();
            // navigation.navigate('Create badge');
            navigation.navigate('Build badge');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['brown1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Ionicons name='ios-hammer' color={iconColorsTable['brown1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Build badge</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default BadgeBottomSheet;
