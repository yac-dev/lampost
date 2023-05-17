import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import {
  baseBackgroundColor,
  iconColorsTable,
  inputBackgroundColorNew,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../../apis/lampost';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const CreateCustomReactionIcon = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [fileName, setFileName] = useState('');

  // doneで、画像をawsに送るのか。画像もfolderから消してね。
  const onDonePress = async () => {
    setLoading(false);
    const result = await lampostAPI.post('/reactionicons', { fileName });
    const { reactionIcon } = result.data;
    setLoading(true);
    props.navigation.navigate('Create new library', { createdReactionIcon: reactionIcon });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={fileName ? false : true}>
          <Text
            style={{
              color: fileName ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [fileName]);

  const pickAndSendImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    // user idと日付でfile名を確保しておく。
    let creatingFileName = `${auth.data._id}-${Date.now()}`;
    if (!pickedImage.cancelled && pickedImage.uri) {
      setLoading(true);
      const formData = new FormData();
      formData.append('userId', auth.data._id);
      if (fileName) {
        formData.append('exFileName', fileName);
      }
      formData.append('fileName', creatingFileName);
      formData.append('reactionIconImage', {
        name: `${auth.data._id}-${new Date()}`,
        uri: pickedImage.uri,
        type: 'image/jpeg',
      });
      const result = await lampostAPI.post('/reactionicons/preview', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setFileName(creatingFileName);
      setLoading(false);
    }
  };
  // 実際にcreateするのは、doneを押してからね。
  // ここはあくまで、previewのみ。

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ color: 'white', marginBottom: 10 }}>
        You can create an image icon. Please send an image file from your phone. This function remove all background
        objects and then generate an image icon.
      </Text>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: iconColorsTable['blue1'],
          padding: 10,
          borderRadius: 7,
          marginBottom: 10,
        }}
        onPress={() => pickAndSendImage()}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Select</Text>
      </TouchableOpacity>
      {fileName ? (
        <View
          style={{
            backgroundColor: inputBackgroundColorNew,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: 65,
            height: 65,
            alignSelf: 'center',
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: `http://192.168.11.30:3500/reactionIconImages/removed-${fileName}.png`,
              // priority: FastImage.priority.normal,
            }}
          />
        </View>
      ) : null}

      <LoadingSpinner />
    </View>
  );
};

export default CreateCustomReactionIcon;
