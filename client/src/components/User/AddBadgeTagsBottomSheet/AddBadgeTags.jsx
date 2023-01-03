import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
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
import { AntDesign } from '@expo/vector-icons';

const AddBadgeTags = () => {
  const { auth } = useContext(GlobalContext);
  const {
    pressedBadgeData,
    setPressedBadgeData,
    addLinkOrBadgeTagsBottomSheetRef,
    addLinkOrBadgeTagsBottomSheetType,
    setBadgeDatas,
    fetchedBadgeTags,
    setFetchedBadgeTags,
    isOpenCreateBadgeTagTextInput,
    setIsOpenCreateBadgeTagTextInput,
  } = useContext(UserContext);
  const {
    addedBadgeTags,
    setAddedBadgeTags,
    isOpenTextInput,
    setIsOpenTextInput,
    creatingBadgeTagNames,
    setCreatingBadgeTagNames,
    creatingBadgeTagText,
    setCreatingBadgeTagText,
  } = useContext(AddBadgeTagsContext);
  const inputAccessoryViewID = 'CREATE_BADGE_TAG';

  const onDonePress = async () => {
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
    setFetchedBadgeTags([]);
    setIsOpenTextInput('');
    addLinkOrBadgeTagsBottomSheetRef.current.close();
  };

  const renderBadgeTags = () => {
    if (fetchedBadgeTags.length) {
      const badgeTagsList = fetchedBadgeTags.map((badgeTag, index) => {
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

  const renderSelectedBadgeTags = (selectedBadgeTagsList) => {
    // const selectedBadgeTagsList = Object.values(addedBadgeTags);
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
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, right: -5 }}
            onPress={() =>
              setCreatingBadgeTagNames((previous) => {
                const updating = [...previous];
                updating.splice(index, 1);
                return updating;
              })
            }
          >
            <AntDesign name='closecircleo' size={15} color={baseTextColor} />
          </TouchableOpacity>
        </View>
      );
    });

    return <ScrollView horizontal={true}>{createdBadgeTagsList}</ScrollView>;
  };

  const renderNote = () => {
    if (!isOpenCreateBadgeTagTextInput) {
      return (
        <TouchableOpacity onPress={() => setIsOpenCreateBadgeTagTextInput(true)}>
          <Text style={{ color: baseTextColor }}>
            Couldn't find what you want from above? Let's create a new one from here
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderTextInput = () => {
    if (isOpenCreateBadgeTagTextInput) {
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

  const renderAddingBadgeTags = () => {
    const selectedBadgeTagsList = Object.values(addedBadgeTags);
    if (selectedBadgeTagsList.length || creatingBadgeTagNames.length) {
      return (
        <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 20 }}>
          {renderSelectedBadgeTags(selectedBadgeTagsList)}
          {renderCreatingBadgeTags()}
        </View>
      );
    }
  };

  return (
    <View>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Add badge tags</Text>
      {/* <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 20 }}>
        {renderSelectedBadgeTags()}
        {renderCreatingBadgeTags()}
      </View> */}
      {renderAddingBadgeTags()}
      {renderBadgeTags()}
      {renderNote()}
      {renderTextInput()}
      <View style={{ alignSelf: 'flex-end', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        {/* {fetchedBadgeTags.length ? (
          <ActionButton
            label='Create new'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='plus' size={25} color='white' />}
            onActionButtonPress={() => setIsOpenCreateBadgeTagTextInput((previous) => !previous)}
          />
        ) : null} */}
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
