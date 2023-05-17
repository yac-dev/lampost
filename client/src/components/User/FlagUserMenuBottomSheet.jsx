import React, { useMemo, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';

const FlagUserMenuBottomSheet = () => {
  const snapPoints = useMemo(() => ['30%'], []);
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { flagUserMenuBottomSheetRef, setIsConfirmBlockUserModalOpen, isBlocked, user, setIsBlocked, navigation } =
    useContext(UserContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={flagUserMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          onPress={() => {
            flagUserMenuBottomSheetRef.current.close();
            navigation.navigate('Report user', { userId: user._id, userName: user.name });
          }}
        >
          <MaterialIcons name='report-problem' size={20} color={baseTextColor} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Report this user</Text>
        </TouchableOpacity>
        {isBlocked ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={async () => {
              const payload = {
                userId: auth.data._id,
                blockingUserId: user._id,
              };
              flagUserMenuBottomSheetRef.current.close();
              setLoading(true);
              const result = await lampostAPI.post('/userblockingrelationships/unblock', payload);
              setLoading(false);
              setSnackBar({
                isVisible: true,
                barType: 'success',
                message: 'Unblocked this user.',
                duration: 5000,
              });
              setIsBlocked(false);
            }}
          >
            <Fontisto name='unlocked' color={baseTextColor} size={20} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Unblock this user</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={() => {
              flagUserMenuBottomSheetRef.current.close();
              setIsConfirmBlockUserModalOpen(true);
            }}
          >
            <Fontisto name='locked' color={baseTextColor} size={20} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Block this user</Text>
          </TouchableOpacity>
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default FlagUserMenuBottomSheet;
