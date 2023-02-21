import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../utils/colorsTable';
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
        width: 100,
        aspectRatio: 1,
        flexDirection: 'column',
        backgroundColor: 'green', //確認用で使える

        // alignItems: 'flex-end',
        marginRight: 30,
      }}
    >
      <View
        style={{
          backgroundColor: user.photo ? null : iconColorsTable['blue1'],
          // padding: 5,
          borderRadius: isIpad ? 20 : 10,
          width: '100%',
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}
      >
        {user.photo ? (
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: isIpad ? 20 : 10 }}
            source={{
              uri: user.photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <FontAwesome5 name='user-astronaut' size={30} color='white' />
        )}
        {isMyPage ? (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: -5, right: -5 }}
            onPress={() => setIsConfirmEditProfileModalOpen(true)}
          >
            <MaterialCommunityIcons name='camera-plus' size={20} color={baseTextColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: 'absolute', bottom: -5, right: -5 }}
            onPress={() => flagUserMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <MaterialCommunityIcons name='flag' size={20} color={baseTextColor} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{user.name}</Text>
    </View>
  );
};

export default AvatarImage;
