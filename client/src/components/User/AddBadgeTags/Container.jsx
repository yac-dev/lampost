import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import lampostAPI from '../../../apis/lampost';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  baseTextColor,
  disabledTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import Example from './Example';
import EmojiPicker from './EmojiPicker';
import SnackBar from '../../Utils/SnackBar';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import { iconsTable } from '../../../utils/icons';

const AddBadgeTagsContainer = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth, setLoading } = useContext(GlobalContext);
  const [addingBadgeTags, setAddingBadgeTags] = useState([{ emoji: '', text: '' }]);
  const [tappedEmoji, setTappedEmoji] = useState(null);
  const userBadge = props.route.params.userBadge;
  // doneの時に、emoji、text共に空欄のやつは自動で除くようにする。

  const onDonePress = async () => {
    setLoading(true);
    const { badgeId, badgeTags } = result.data;
    setLoading(false);
    console.log(result.data);
    props.navigation.navigate('Profile', { badgeId: badgeId, badgeTags });
  };

  useEffect(() => {
    // setMyBadges(props.route.params.myBadges);
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={true}>
          <Text
            style={{
              color: disabledTextColor,
              fontSize: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [addingBadgeTags]);

  useEffect(() => {
    if (props.route.params?.selectedEmoji) {
      setAddingBadgeTags((previous) => {
        const updating = [...previous];
        updating[tappedEmoji].emoji = props.route.params.selectedEmoji;
        return updating;
      });
    }
  }, [props.route.params?.selectedEmoji]);

  // 全部空欄状態なら、doneできないように。かつ、一回のaddで、5つまで。
  const renderAddingBadgeTags = () => {
    const list = addingBadgeTags.map((badgeTag, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: inputBackgroundColorNew,
              width: 40,
              height: 40,
              borderRadius: 5,
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setTappedEmoji(index);
              props.navigation.navigate('Emoji picker');
            }}
          >
            {badgeTag.emoji ? (
              <Text style={{ fontSize: 30 }}>{badgeTag.emoji}</Text>
            ) : (
              <MaterialCommunityIcons name='emoticon-excited-outline' size={25} color={baseTextColor} />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder='Type text here'
            placeholderTextColor={baseTextColor}
            style={{
              padding: 10,
              backgroundColor: inputBackgroundColorNew,
              borderRadius: 5,
              height: 40,
              flex: 1,
              color: baseTextColor,
            }}
            value={badgeTag.text}
            onChangeText={(text) =>
              setAddingBadgeTags((previous) => {
                const updating = [...previous];
                updating[index].text = text;
                return updating;
              })
            }
          />
        </View>
      );
    });
    return <View style={{ marginBottom: 15 }}>{list}</View>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>Add badge tags</Text>
      </View>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>Express your badge more by using emoji and text.</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{ width: 60, height: 60, backgroundColor: rnDefaultBackgroundColor, borderRadius: 8, marginRight: 15 }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: backgroundColorsTable[userBadge.badge.color],
            }}
          >
            <FastImage
              source={{ uri: userBadge.badge.icon.url }}
              style={{ width: 40, height: 40 }}
              tintColor={iconColorsTable[userBadge.badge.color]}
            />
          </View>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{userBadge.badge.name}</Text>
      </View>
      {renderAddingBadgeTags()}
      {addingBadgeTags.length <= 4 ? (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          onPress={() => setAddingBadgeTags((previous) => [...previous, { emoji: '', text: '' }])}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Add more</Text>
        </TouchableOpacity>
      ) : null}

      <SnackBar />
      <LoadingSpinner />
    </View>
  );
};

export default AddBadgeTagsContainer;
