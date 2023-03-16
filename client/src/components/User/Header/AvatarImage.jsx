import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const AvatarImage = () => {
  const { user, isMyPage, isIpad, setIsConfirmEditProfileModalOpen, flagUserMenuBottomSheetRef } =
    useContext(UserContext);
  const oneContainerWidth = (Dimensions.get('window').width * 2) / 5;
  const avatarWidth = oneContainerWidth * 0.5;

  return (
    <View
      style={{
        width: 65,
        aspectRatio: 1,
        // backgroundColor: 'green', //確認用で使える
      }}
    >
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          borderRadius: isIpad ? 20 : 10,
          width: '100%',
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}
      >
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius: isIpad ? 20 : 10,
          }}
          source={{
            uri: user.photo ? user.photo : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={user.photo ? null : 'white'}
        />
        {isMyPage ? (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            onPress={() => setIsConfirmEditProfileModalOpen(true)}
          >
            <MaterialCommunityIcons name='camera-plus' size={20} color={baseTextColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            onPress={() => flagUserMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <MaterialCommunityIcons name='flag' size={20} color={baseTextColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AvatarImage;
