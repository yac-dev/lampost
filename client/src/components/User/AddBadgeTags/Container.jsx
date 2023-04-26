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
  const [addedBadgeTags, setAddedBadgeTags] = useState([]);
  const [tappedEmoji, setTappedEmoji] = useState(null);
  const userBadge = props.route.params.userBadge;
  const [doneDisabled, setDoneDisabled] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [badgeTagTextInput, setBadgeTagTextInput] = useState('');
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
        <TouchableOpacity disabled={addedBadgeTags.length ? false : true} onPress={() => onDonePress()}>
          <Text
            style={{
              color: addedBadgeTags.length ? 'white' : disabledTextColor,
              fontSize: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [addedBadgeTags]);

  useEffect(() => {
    if (props.route.params?.selectedEmoji) {
      setSelectedEmoji(props.route.params.selectedEmoji);
    }
  }, [props.route.params?.selectedEmoji]);

  // 全部空欄状態なら、doneできないように。かつ、一回のaddで、5つまで。
  const renderAddedBadgeTags = () => {
    if (addedBadgeTags.length) {
      const list = addedBadgeTags.map((badgeTag, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: inputBackgroundColorNew,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 5 }}>{badgeTag.emoji}</Text>
            <Text style={{ fontSize: 18, color: baseTextColor }}>{badgeTag.text}</Text>
          </View>
        );
      });
      return (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ paddingRight: 50 }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>Add badge tags</Text>
      </View>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>Express your badge more by using emoji and text.</Text>
      <Example />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
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
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 7 }}>
            {userBadge.badge.name}
          </Text>
          {renderAddedBadgeTags()}
        </View>
      </View>
      <View style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
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
              props.navigation.navigate('Emoji picker');
            }}
          >
            {selectedEmoji ? (
              <Text style={{ fontSize: 30 }}>{selectedEmoji}</Text>
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
              fontSize: 18,
            }}
            value={badgeTagTextInput}
            onChangeText={(text) => setBadgeTagTextInput(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: selectedEmoji && badgeTagTextInput ? iconColorsTable['blue1'] : '#535353',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          onPress={() => {
            setAddedBadgeTags((previous) => [...previous, { emoji: selectedEmoji, text: badgeTagTextInput }]);
            setSelectedEmoji('');
            setBadgeTagTextInput('');
          }}
          disabled={selectedEmoji && badgeTagTextInput ? false : true}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Add this tag</Text>
        </TouchableOpacity>
      </View>

      <SnackBar />
      <LoadingSpinner />
    </View>
  );
};

export default AddBadgeTagsContainer;
