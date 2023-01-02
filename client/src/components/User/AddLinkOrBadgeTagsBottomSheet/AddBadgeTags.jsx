import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import { View, Text, ScrollView, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  baseTextColor,
  iconColorsTable,
  inputBackgroundColor,
  sectionBackgroundColor,
} from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import BadgeTag from './BadgeTag';
import ActionButton from '../../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddBadgeTags = () => {
  const { auth } = useContext(GlobalContext);
  const {
    pressedBadgeData,
    setPressedBadgeData,
    addLinkOrBadgeTagsBottomSheetRef,
    addLinkOrBadgeTagsBottomSheetType,
    setBadgeDatas,
  } = useContext(UserContext);
  const [text, setText] = useState('');
  const [badgeTags, setBadgeTags] = useState([]);
  const [addedBadgeTags, setAddedBadgeTags] = useState({});
  const [isOpenTextInput, setIsOpenTextInput] = useState(false);
  const [creatingBadgeTagNames, setCreatingBadgeTagNames] = useState([]);
  const [creatingBadgeTagText, setCreatingBadgeTagText] = useState('');
  const inputAccessoryViewID = 'CREATE_BADGE_TAG';

  const getBadgeTagsByBadgeId = async () => {
    const result = await lampostAPI.get(`/badgetags/${pressedBadgeData.badge._id}`);
    const { badgeTags } = result.data;
    setBadgeTags(badgeTags);
  };

  useEffect(() => {
    getBadgeTagsByBadgeId();
  }, []);

  const onDonePress = async () => {
    // console.log(addedBadgeTags, creatingBadgeTagNames);
    const result = await lampostAPI.patch(
      `/badgeanduserrelationships/add/${pressedBadgeData.badge._id}/${auth.data._id}`,
      { addedBadgeTags, creatingBadgeTagNames }
    );
    const { badgeId, badgeTags } = result.data;
    setPressedBadgeData((previous) => {
      return {
        ...previous,
        badgeTags: [...previous.badgeTags, ...badgeTags],
      };
    });
    setBadgeDatas((previous) => {
      const updating = [...previous];
      for (let i = 0; i < updating.length; i++) {
        if (updating[i].badge._id === badgeId) {
          updating[i].badgeTags.push(...badgeTags);
        }
      }
      return updating;
    });

    const result2 = await lampostAPI.post(`/badgetaganduserrelationships`, { badgeTags, userId: auth.data._id });
    setAddedBadgeTags({});
    setBadgeTags([]);
    setIsOpenTextInput('');
    addLinkOrBadgeTagsBottomSheetRef.current.close();
  };

  const renderBadgeTags = () => {
    if (badgeTags.length) {
      const badgeTagsList = badgeTags.map((badgeTag, index) => {
        return (
          <BadgeTag
            key={index}
            badgeTag={badgeTag}
            addedBadgeTags={addedBadgeTags}
            setAddedBadgeTags={setAddedBadgeTags}
            isOpenTextInput={isOpenTextInput}
            setIsOpenTextInput={setIsOpenTextInput}
          />
        );
      });

      return (
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>Please select tags you wanna add.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{badgeTagsList}</View>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderSelectedBadgeTags = () => {
    const selectedBadgeTagsList = Object.values(addedBadgeTags);
    if (selectedBadgeTagsList.length) {
      const badgeTagsList = selectedBadgeTagsList.map((badgeTag, index) => {
        return (
          <View
            style={{
              borderWidth: 0.3,
              borderColor: baseTextColor,
              padding: 5,
              marginRight: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index}
          >
            <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 5 }}>{badgeTag.name}</Text>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
          {badgeTagsList}
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const renderCreatingBadgeTags = () => {
    const createdBadgeTagsList = creatingBadgeTagNames.map((badgeTagName, index) => {
      return (
        <View
          style={{
            borderWidth: 0.3,
            borderColor: baseTextColor,
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          key={index}
        >
          <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 5 }}>{badgeTagName}</Text>
        </View>
      );
    });

    return <ScrollView horizontal={true}>{createdBadgeTagsList}</ScrollView>;
  };

  const renderTextInput = () => {
    if (isOpenTextInput) {
      return (
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>
            Please write a tag name and press "Add". ({creatingBadgeTagText.length}/ 20)
          </Text>
          <BottomSheetTextInput
            placeholder='Type here'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              backgroundColor: inputBackgroundColor,
              padding: 10,
              borderRadius: 10,
              color: baseTextColor,
            }}
            value={creatingBadgeTagText}
            onChangeText={(text) => setCreatingBadgeTagText(text)}
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
                  setIsOpenTextInput(false);
                  setCreatingBadgeTagText('');
                  setCreatingBadgeTagNames((previous) => [...previous, creatingBadgeTagText]);
                  Keyboard.dismiss();
                }}
              >
                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {addLinkOrBadgeTagsBottomSheetType}
      </Text>
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 20 }}>
        {renderSelectedBadgeTags()}
        {renderCreatingBadgeTags()}
      </View>

      {renderBadgeTags()}
      {renderTextInput()}
      <View style={{ alignSelf: 'flex-end', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <ActionButton
          label='Create new'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='plus' size={25} color='white' />}
          onActionButtonPress={() => setIsOpenTextInput((previous) => !previous)}
        />
        <ActionButton
          label='Done'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='check' size={25} color='white' />}
          onActionButtonPress={() => onDonePress()}
        />
      </View>
    </View>
  );
};

export default AddBadgeTags;
