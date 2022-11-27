import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import lampostAPI from '../../apis/lampost';
import FastImage from 'react-native-fast-image';

const Asset = (props) => {
  console.log(props.route.params.assetId);
  const [asset, setAsset] = useState(null);
  const getImage = async () => {
    const result = await lampostAPI.get(`/assets/${props.route.params.assetId}`);
    const { asset } = result.data;
    setAsset(asset);
  };
  useEffect(() => {
    getImage();
  }, []);

  const renderAsset = () => {
    if (asset) {
      return (
        <View
          style={{ width: '100%', height: undefined, aspectRatio: 1 }}
          // onPress={() => props.onPressAsset(asset._id)}
        >
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Now loading...</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Text>Asset</Text>
      {renderAsset()}
    </View>
  );
};

export default Asset;
