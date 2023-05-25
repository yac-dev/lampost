import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
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
import Icon from './Icon';
import BadgeName from './BadgeName';
import BadgeColor from './BadgeColor';
import BadgeGenres from './BadgeGenres';
import lampostAPI from '../../../apis/lampost';
import apiURL from '../../../apis/baseURL';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import SnackBar from '../../Utils/SnackBar';

// iconをfetchしてきて、
const Container = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const [chooseIconOrCreateIcon, setChooseIconOrCreateIcon] = useState('choose');
  const [selectedBadgeGenre, setSelectedBadgeGenre] = useState(null);
  const [badgeIcon, setBadgeIcon] = useState(null);
  const [badgeNameTextInput, setBadgeNameTextInput] = useState(''); // emojiは入れないようにしたい絵文字判別をしよう。
  const [badgeColor, setBadgeColor] = useState('');
  const [folderName, setFolderName] = useState('');
  const [creatingImagePath, setCreatingImagePath] = useState('');
  const [sent, setSent] = useState(false);
  const [accordion, setAccordion] = useState({
    name: true,
    icon: false,
    color: false,
    genre: false,
  });
  console.log(badgeIcon);

  const onClose = async () => {
    if (folderName) {
      setLoading(true);
      const result = await lampostAPI.post('/badges/imagefolder', { folderName });
      setLoading(false);
      props.navigation.goBack();
    } else {
      props.navigation.goBack();
    }
  };
  console.log(folderName);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => onClose()}>
          <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
        </TouchableOpacity>
      ),
    });
  }, [folderName]);

  const onDoneValidation = () => {
    if (chooseIconOrCreateIcon === 'choose') {
      if (badgeIcon && badgeNameTextInput && badgeColor && selectedBadgeGenre) {
        return false;
      } else {
        return true;
      }
    } else if (chooseIconOrCreateIcon === 'create') {
      if (folderName && badgeNameTextInput && badgeColor && selectedBadgeGenre) {
        return false;
      } else {
        return true;
      }
    }
  };

  // from componentが必要だね。
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={onDoneValidation()}>
          <Text
            style={{
              color: onDoneValidation() ? screenSectionBackgroundColor : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [badgeIcon, badgeNameTextInput, badgeColor, selectedBadgeGenre, folderName]);

  const onDonePress = async () => {
    if (chooseIconOrCreateIcon === 'choose') {
      try {
        setLoading(true);
        const payload = {
          iconId: badgeIcon._id,
          name: badgeNameTextInput,
          color: badgeColor,
          userId: auth.data._id,
          badgeTypeId: selectedBadgeGenre._id,
          // folderNameがあれば、それもここに追加するように。
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
      } catch (error) {
        setLoading(false);
        setSnackBar({
          isVisible: true,
          message: 'Failed to create. This badge name already exists. It should be unique.',
          barType: 'error',
          duration: 7000,
        });
      }
    } else if (chooseIconOrCreateIcon === 'create') {
      try {
        setLoading(true);
        const payload = {
          folderName,
          name: badgeNameTextInput,
          color: badgeColor,
          userId: auth.data._id,
          badgeTypeId: selectedBadgeGenre._id,
        };
        const result = await lampostAPI.post('/badges/fromscratch', payload);
        const { badge } = result.data;
        // badgeIconって何のこと言っているんだ。
        // const createdBadge = {
        //   _id: badge._id,
        //   icon: { _id: badgeIcon._id, url: badgeIcon.url },
        //   name: badge.name,
        //   color: badge.color,
        // };
        setLoading(false);
        // apiで帰ってきたidを使って、add badgesに送ろう。
        // { name: 'Add badge tags', params: { selectedEmoji }, merge: true }
        props.navigation.navigate({ name: 'Add badges', params: { createdBadge: badge }, merge: true });
      } catch (error) {
        setLoading(false);
        setSnackBar({
          isVisible: true,
          message: 'Failed to create. This badge name is already exists. Badge name should be unique.',
          barType: 'error',
          duration: 5000,
        });
      }
    }
  };

  useEffect(() => {
    if (props.route.params?.selectedIcon) {
      setBadgeIcon(props.route.params.selectedIcon);
    }
  }, [props.route.params?.selectedIcon]);

  const renderPreviewIcon = () => {
    switch (chooseIconOrCreateIcon) {
      case 'choose':
        if (badgeIcon) {
          return (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                backgroundColor: rnDefaultBackgroundColor,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: badgeColor ? backgroundColorsTable[badgeColor] : null,
                  borderRadius: 10,
                }}
              >
                <FastImage
                  source={{ uri: badgeIcon.url }}
                  style={{ width: 45, height: 45 }}
                  tintColor={badgeColor ? iconColorsTable[badgeColor] : 'black'}
                />
              </View>
            </View>
          );
        } else {
          return null;
        }
      case 'create':
        if (folderName) {
          return (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                backgroundColor: rnDefaultBackgroundColor,

                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: badgeColor ? backgroundColorsTable[badgeColor] : null,
                  borderRadius: 10,
                }}
              >
                <FastImage
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  source={{
                    uri: `${apiURL}/badgeImages/${folderName}/transparented.png`,
                    // priority: FastImage.priority.normal,
                  }}
                  tintColor={badgeColor ? iconColorsTable[badgeColor] : 'black'}
                />
              </View>
            </View>
          );
        } else {
          return null;
        }
      default:
        return null;
    }
  };

  return (
    <FormContext.Provider
      value={{
        accordion,
        setAccordion,
        navigation: props.navigation,
        chooseIconOrCreateIcon,
        setChooseIconOrCreateIcon,
        badgeIcon,
        setBadgeIcon,
        badgeColor,
        setBadgeColor,
        selectedBadgeGenre,
        setSelectedBadgeGenre,
        badgeNameTextInput,
        setBadgeNameTextInput,
        folderName,
        setFolderName,
        creatingImagePath,
        setCreatingImagePath,
        sent,
        setSent,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 5, color: 'white' }}>Create badge</Text>
        <Text style={{ color: baseTextColor, marginBottom: 15 }}>
          Couldn't find your topic? Then create a new badge and share it with everyone.
        </Text>
        <BadgeName />
        <Icon />
        <BadgeColor />
        <BadgeGenres />
        <View style={{ alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Preview</Text>
          {renderPreviewIcon()}
          <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>{badgeNameTextInput}</Text>
        </View>
        {/* <View style={{ marginBottom: 20, alignSelf: 'center' }}>
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
        </View> */}

        <LoadingSpinner />
        <SnackBar />
      </View>
    </FormContext.Provider>
  );
};

export default Container;
