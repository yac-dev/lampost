import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { baseTextColor, iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';
import { iconsTable } from '../../../../utils/icons';
import socialMediasTable from '../../../../utils/socialMediasTable';
import ActionButton from '../../../Utils/ActionButton';

const Links = () => {
  const { MaterialCommunityIcons, Feather, Entypo } = iconsTable;
  const { pressedBadgeData, isMyPage, badgeDetailBottomSheetRef, navigation } = useContext(UserContext);

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', "You can't open this link.", [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
        cancelable: false,
      });
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['grey1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='link-variant' color={iconColorsTable['grey1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Links</Text>
        </View>
        {isMyPage ? (
          <ActionButton
            icon={<MaterialCommunityIcons name='link-variant' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => {
              navigation.navigate('Add link', {
                badgeId: pressedBadgeData.badge._id,
              });
              badgeDetailBottomSheetRef.current.close();
            }}
            label='Add'
          />
        ) : null}
      </View>
      {pressedBadgeData.links.length ? (
        // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //   <Text style={{ color: baseTextColor, marginRight: 10 }}>{pressedBadgeData.link}</Text>
        //   <TouchableOpacity>
        //     <Feather name='external-link' size={20} color={baseTextColor} />
        //   </TouchableOpacity>
        // </View>
        pressedBadgeData.links.map((link, index) => {
          return (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => console.log('link.url')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {socialMediasTable[link.platform].icon}
                <Text style={{ color: 'white', marginRight: 10 }}>{link.name}</Text>
              </View>
              <TouchableOpacity onPress={() => openURL(link.url)}>
                <Feather name='external-link' color={'white'} size={20} />
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={{ color: baseTextColor }}>No links added yet.</Text>
      )}
    </View>
  );
};

export default Links;
