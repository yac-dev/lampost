import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';

const Asset = (props) => {
  const [asset, setAsset] = useState(null);

  const getAsset = async () => {
    const result = await lampostAPI.get(
      `/assetanduserrelationships/${props.route.params.assetId}/${props.route.params.userId}`
    );
    const { asset } = result.data;
    setAsset(asset);
  };
  useEffect(() => {
    getAsset();
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

  return <View>{renderAsset()}</View>;
};

export default Asset;
