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
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import BadgeTag from './BadgeTag';
import ActionButton from '../../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { iconsTable } from '../../../utils/icons';

const AddBadgeTags = () => {
  const { Ionicons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const {
    pressedBadgeData,
    setPressedBadgeData,
    addBadgeTagsBottomSheetRef,
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
  const [isDisabledDone, setIsDisabledDone] = useState(true);
  const inputAccessoryViewID = 'CREATE_BADGE_TAG';

  useEffect(() => {
    if (Object.values(creatingBadgeTagNames).length) {
      setIsDisabledDone(false);
    } else {
      setIsDisabledDone(true);
    }
  }, [creatingBadgeTagNames]);

  const onDonePress = async () => {
    const result = await lampostAPI.patch(
      `/badgeanduserrelationships/add/${pressedBadgeData.badge._id}/${auth.data._id}`,
      { addedBadgeTags, creatingBadgeTagNames }
    );
    setCreatingBadgeTagNames([]);
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
    addBadgeTagsBottomSheetRef.current.close();
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
            backgroundColor: screenSectionBackgroundColor,
            padding: 10,
            marginRight: 15,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          key={index}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{badgeTagName}</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -5,
              right: -10,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: iconColorsTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              setCreatingBadgeTagNames((previous) => {
                const updating = [...previous];
                updating.splice(index, 1);
                return updating;
              })
            }
          >
            <Ionicons name='remove' size={15} color={'white'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Adding tags</Text>
        <ScrollView horizontal={true} style={{ paddingTop: 10, paddingBottom: 5 }}>
          {createdBadgeTagsList}
        </ScrollView>
      </View>
    );
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
                disabled={creatingBadgeTagText ? false : true}
              >
                <Text
                  style={{
                    color: creatingBadgeTagText ? 'white' : disabledTextColor,
                    padding: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Add
                </Text>
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
          isDisabled={isDisabledDone}
        />
      </View>
    </View>
  );
};

export default AddBadgeTags;
