import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  baseTextColor,
  inputBackgroundColorNew,
  iconColorsTable,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import BadgeGenres from './BadgeGenres';
import lampostAPI from '../../../apis/lampost';
import LoadingSpinner from '../../Utils/LoadingSpinner';

// iconをfetchしてきて、
const Container = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const [selectedBadgeGenre, setSelectedBadgeGenre] = useState(null);
  const [badgeIcon, setBadgeIcon] = useState(null);
  const [badgeNameTextInput, setBadgeNameTextInput] = useState(''); // emojiは入れないようにしたい絵文字判別をしよう。
  const [badgeColor, setBadgeColor] = useState('');

  // /\p{Emoji}/u.test('flowers') // emojiのdetection

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={badgeIcon && badgeNameTextInput && badgeColor && selectedBadgeGenre ? false : true}
        >
          <Text
            style={{
              color:
                badgeIcon && badgeNameTextInput && badgeColor && selectedBadgeGenre
                  ? 'white'
                  : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: badgeIcon && badgeNameTextInput && badgeColor && selectedBadgeGenre ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [badgeIcon, badgeNameTextInput, badgeColor, selectedBadgeGenre]);
  const onDonePress = async () => {
    setLoading(true);
    const payload = {
      iconId: badgeIcon._id,
      name: badgeNameTextInput,
      color: badgeColor,
      userId: auth.data._id,
      badgeTypeId: selectedBadgeGenre._id,
    };
    const result = await lampostAPI.post('/badges', payload);
    const { badge } = result.data;
    const createdBadge = {
      _id: badge._id,
      icon: { _id: badgeIcon._id, url: badgeIcon.url },
      name: badge.name,
      color: badge.color,
    };
    setLoading(false);
    // apiで帰ってきたidを使って、add badgesに送ろう。
    props.navigation.navigate('Add badges', { createdBadge });
  };

  useEffect(() => {
    if (props.route.params?.selectedIcon) {
      setBadgeIcon(props.route.params.selectedIcon);
    }
  }, [props.route.params?.selectedIcon]);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 5, color: 'white' }}>Create badge</Text>
      <Text style={{ color: baseTextColor, marginBottom: 25 }}>
        Choose an icon, unique name, color and genre to create meaningful badge. This badge will be also shared with
        everyone.
      </Text>
      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: badgeIcon ? rnDefaultBackgroundColor : inputBackgroundColorNew,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          alignSelf: 'center',
        }}
        onPress={() => props.navigation.navigate('Icon picker')}
      >
        {badgeIcon ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: badgeColor ? backgroundColorsTable[badgeColor] : null,
            }}
          >
            <FastImage
              source={{ uri: badgeIcon.url }}
              style={{ width: 60, height: 60 }}
              tintColor={badgeColor ? iconColorsTable[badgeColor] : 'black'}
            />
          </View>
        ) : (
          <View style={{}}>
            <MaterialCommunityIcons name='plus' size={30} color={'white'} style={{ alignSelf: 'center' }} />
            <Text style={{ textAlign: 'center', color: 'white' }}>Choose an icon</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={{ marginBottom: 20, alignSelf: 'center' }}>
        <TextInput
          placeholder='Badge name here'
          placeholderTextColor={baseTextColor}
          value={badgeNameTextInput}
          onChangeText={(text) => setBadgeNameTextInput(text)}
          autoCapitalize='none'
          style={{ fontSize: 22, color: 'white' }}
        />
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>
          {badgeNameTextInput.replace(/ /g, '').length}/20
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['red1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('red1')}
          >
            {badgeColor === 'red1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('blue1')}
          >
            {badgeColor === 'blue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['orange1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('orange1')}
          >
            {badgeColor === 'orange1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['green1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('green1')}
          >
            {badgeColor === 'green1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['violet1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('violet1')}
          >
            {badgeColor === 'violet1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['yellow1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('yellow1')}
          >
            {badgeColor === 'yellow1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['lightBlue1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('lightBlue1')}
          >
            {badgeColor === 'lightBlue1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['lightGreen1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('lightGreen1')}
          >
            {badgeColor === 'lightGreen1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: iconColorsTable['pink1'],
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setBadgeColor('pink1')}
          >
            {badgeColor === 'pink1' ? <Ionicons name='checkmark-circle' size={15} color={'white'} /> : null}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <BadgeGenres selectedBadgeGenre={selectedBadgeGenre} setSelectedBadgeGenre={setSelectedBadgeGenre} />
      <LoadingSpinner />
    </View>
  );
};

export default Container;
