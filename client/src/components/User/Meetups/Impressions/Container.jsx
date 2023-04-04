import React, { useContext, useState, useEffect, useCallback } from 'react';
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
import {
  baseBackgroundColor,
  inputBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  disabledTextColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import { emojis } from '../../../../utils/emojisList';
import FastImage from 'react-native-fast-image';

const ImpressionsContainer = (props) => {
  const inputAccessoryViewID = 'IMPRESSION_INPUT';
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [impressions, setImpressions] = useState([]);
  const [isFetchedImpressions, setIsFetchedImpressions] = useState(false);
  const [impressionTextInput, setImpressionTextInput] = useState('');
  const [addedEmojis, setAddedEmojis] = useState([]);

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
    return (
      <View style={{ padding: 10, marginBottom: 10, backgroundColor: screenSectionBackgroundColor, borderRadius: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                marginRight: 20,
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
              <Text style={{ marginBottom: 5, color: 'white', fontSize: 17 }}>{impression.user.name}</Text>
              <Text style={{ color: baseTextColor }}>{renderDate(impression.createdAt)}</Text>
            </View>
          </View>
          {impression.emojis.length ? (
            <View style={{}}>
              <FlatList
                data={impression.emojis}
                renderItem={({ item }) => {
                  return <Text style={{ fontSize: 18 }}>{item}</Text>;
                }}
                keyExtractor={(item, index) => `${item}-${index}`}
                horizontal={true}
              />
            </View>
          ) : null}
        </View>

        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: 'white' }}>{impression.content}</Text>
        </View>
      </View>
    );
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
    const payload = {
      meetupId: props.route.params.meetupId,
      user: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      emojis: addedEmojis,
      content: impressionTextInput,
      launcherId: props.route.params.launcher,
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
    setAddedEmojis([]);
    Keyboard.dismiss();
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your impression was sent.',
      duration: 5000,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {addedEmojis.length ? (
          <View style={{ padding: 10, marginRight: 5, backgroundColor: screenSectionBackgroundColor, borderRadius: 5 }}>
            <FlatList
              data={addedEmojis}
              renderItem={({ item }) => {
                return <Text>{item}</Text>;
              }}
              keyExtractor={(item, index) => `${item}-${index}`}
              horizontal={true}
            />
          </View>
        ) : null}

        <TextInput
          placeholder="How was this meetup? Let's share your thoughts!"
          placeholderTextColor={baseTextColor}
          inputAccessoryViewID={inputAccessoryViewID}
          autoCapitalize='none'
          value={impressionTextInput}
          onChangeText={setImpressionTextInput}
          style={{
            flex: 1,
            borderRadius: 5,
            padding: 10,
            backgroundColor: inputBackgroundColor,
            color: 'white',
          }}
        />
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={screenSectionBackgroundColor}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FlatList
                data={emojis}
                renderItem={({ item }) => renderEmoji(item)}
                keyExtractor={(item, index) => `${item}-${index}`}
                horizontal={true}
                keyboardShouldPersistTaps={'always'}
              />
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setAddedEmojis((previous) => {
                    const updating = [...previous];
                    updating.pop();
                    return updating;
                  });
                }}
                disabled={addedEmojis.length ? false : true}
              >
                <Text style={{ color: addedEmojis.length ? 'white' : baseTextColor, fontWeight: 'bold' }}>Remove</Text>
              </TouchableOpacity>
            </View>
            {/* {renderEmojisList()} */}

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
                <TouchableOpacity
                  onPress={() => sendImpression()}
                  style={{ padding: 10 }}
                  disabled={impressionTextInput ? false : true}
                >
                  <Text style={{ color: impressionTextInput ? 'white' : baseTextColor, fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </InputAccessoryView>
      </View>
      {isFetchedImpressions ? renderImpressions() : <ActivityIndicator />}
    </View>
  );
};

export default ImpressionsContainer;
