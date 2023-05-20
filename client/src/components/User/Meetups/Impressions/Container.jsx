import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  InputAccessoryView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  FlatList,
} from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import GlobalContext from '../../../../GlobalContext';
import ImpressionsContext from './ImpressionsContext';
import {
  baseBackgroundColor,
  inputBackgroundColor,
  inputBackgroundColorNew,
  baseTextColor,
  screenSectionBackgroundColor,
  disabledTextColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import FastImage from 'react-native-fast-image';
import EmojiBottomSheet from './EmojiBottomSheet';

const impressionTypes = [
  { emoji: '😁', label: 'Fun', point: 5 },
  { emoji: '⌚️', label: 'Good time management', point: 5 },
  { emoji: '🤝', label: 'Good team management', point: 5 },
  { emoji: '💡', label: 'Creative', point: 5 },
  { emoji: '🚀', label: 'Leadership', point: 15 },
  { emoji: '💪', label: 'Room for improvement', point: 3 },
  { emoji: '💩', label: 'Terrible', point: -20 },
];

const ImpressionsContainer = (props) => {
  const inputAccessoryViewID = 'IMPRESSION_INPUT';
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [impressions, setImpressions] = useState([]);
  const [isFetchedImpressions, setIsFetchedImpressions] = useState(false);
  const [impressionTextInput, setImpressionTextInput] = useState('');
  const [addedImpressions, setAddedImpressions] = useState({});
  const emojiBottomSheetRef = useRef(null);

  const getImpressions = async () => {
    const result = await lampostAPI.get(`/impressions/${props.route.params.meetupId}`);
    const { impressions } = result.data;
    setImpressions(impressions);
    setIsFetchedImpressions(true);
  };
  useEffect(() => {
    getImpressions();
  }, []);

  const renderEmoji = (emoji) => {
    return (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          setAddedEmojis((previous) => [...previous, emoji]);
        }}
        disabled={addedEmojis.length === 5 ? true : false}
      >
        <Text>{emoji}</Text>
      </TouchableOpacity>
    );
  };
  // launcherのimpressionだけ、上にpinするのがいいな。

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(118, 120, 124)' }}>{d}</Text>;
  };

  // require(
  const renderImpression = (impression) => {
    if (impression.user) {
      return (
        <View
          style={{
            padding: 5,
            marginBottom: 10,
            // backgroundColor: screenSectionBackgroundColor,
            borderRadius: 5,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15,
                  backgroundColor: iconColorsTable['blue1'],
                }}
                source={{
                  uri: impression.user.photo
                    ? impression.user.photo
                    : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                }}
                resizeMode={FastImage.resizeMode.stretch}
                tintColor={impression.user.photo ? null : 'white'}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ marginBottom: 5, color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {impression.user.name}
                </Text>
                <FlatList
                  data={impression.emojis}
                  renderItem={({ item }) => {
                    return <Text style={{ fontSize: 18 }}>{item}</Text>;
                  }}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  horizontal={true}
                />
              </View>
            </View>
            <Text style={{ color: baseTextColor }}>{renderDate(impression.createdAt)}</Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white' }}>{impression.content}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderImpressions = () => {
    if (impressions.length) {
      return (
        <FlatList
          data={impressions}
          renderItem={({ item }) => renderImpression(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    } else {
      return (
        <Text style={{ color: 'white', textAlign: 'center' }}>You'll see all the impressions of this meetup.</Text>
      );
    }
  };

  const sendImpression = async () => {
    const emojis = [];
    let totalPoint = 0; // added impressionのpointをloop throughして合計を出す。
    for (let key in addedImpressions) {
      totalPoint = totalPoint + addedImpressions[key].point;
      emojis.push(addedImpressions[key].emoji);
    }
    const payload = {
      meetupId: props.route.params.meetupId,
      user: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      emojis,
      content: impressionTextInput,
      launcherId: props.route.params.launcher ? props.route.params.launcher : null,
      totalPoint,
    };
    setLoading(true);
    let result;
    if (auth.data._id === props.route.params.launcher) {
      result = await lampostAPI.post('/impressions/bylauncher', payload);
    } else {
      result = await lampostAPI.post('/impressions/bymember', payload);
    }
    const { impression } = result.data;
    setImpressions((previous) => [...previous, impression]);
    setImpressionTextInput('');
    setAddedImpressions({});
    Keyboard.dismiss();
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your impression has been sent successfully.',
      duration: 5000,
    });
  };
  console.log(impressions);
  return (
    <ImpressionsContext.Provider
      value={{ emojiBottomSheetRef, impressionTypes, addedImpressions, setAddedImpressions }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        {impressions.some((impression) => impression.user._id === auth.data._id) ? null : (
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <TouchableOpacity
                style={{ padding: 10, marginRight: 5, backgroundColor: inputBackgroundColorNew, borderRadius: 5 }}
                onPress={() => emojiBottomSheetRef.current.snapToIndex(0)}
              >
                {Object.keys(addedImpressions).length ? (
                  <FlatList
                    data={Object.values(addedImpressions)}
                    renderItem={({ item }) => {
                      return <Text style={{ fontSize: 20 }}>{item.emoji}</Text>;
                    }}
                    keyExtractor={(item, index) => `${item.emoji}-${index}`}
                    horizontal={true}
                  />
                ) : (
                  <MaterialCommunityIcons name='emoticon' color={baseTextColor} size={20} />
                )}
              </TouchableOpacity>

              <TextInput
                placeholder="Let's share your feeling"
                placeholderTextColor={baseTextColor}
                inputAccessoryViewID={inputAccessoryViewID}
                autoCapitalize='none'
                value={impressionTextInput}
                onChangeText={setImpressionTextInput}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: inputBackgroundColorNew,
                  color: 'white',
                }}
              />
              <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={screenSectionBackgroundColor}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View></View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => {
                          Keyboard.dismiss();
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </InputAccessoryView>
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor:
                  Object.keys(addedImpressions).length && impressionTextInput.length
                    ? iconColorsTable['blue1']
                    : inputBackgroundColorNew,
                borderRadius: 5,
                marginBottom: 20,
                padding: 10,
              }}
              disabled={Object.keys(addedImpressions).length && impressionTextInput.length ? false : true}
              onPress={() => sendImpression()}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Send</Text>
            </TouchableOpacity>
          </View>
        )}

        {isFetchedImpressions ? renderImpressions() : <ActivityIndicator />}
        <EmojiBottomSheet />
      </View>
    </ImpressionsContext.Provider>
  );
};

export default ImpressionsContainer;
