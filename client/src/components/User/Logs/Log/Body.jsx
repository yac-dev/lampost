import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LogsContext from '../LogsContext';
import LogContext from '../LogContext';
import ActionButton from '../../../Utils/ActionButton';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import { FontAwesome } from '@expo/vector-icons';

const Body = () => {
  const { pastMeetup } = useContext(LogContext);
  const { addImpressionsBottomSheetRef } = useContext(LogsContext);

  const renderAssets = () => {
    const assetsList = pastMeetup.assets.map((asset, index) => {
      return <Image key={index} style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: asset.data }} />;
    });

    return <View style={{ flexDirection: 'row' }}>{assetsList}</View>;
  };

  return (
    <View style={{ marginBottom: 0 }}>
      <View style={{ marginBottom: 10 }}>{renderAssets()}</View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>No messages added ...</Text>
        <View style={{ alignSelf: 'flex-end' }}>
          <ActionButton
            label='What are your thoughts?'
            backgroundColor={iconColorsTable['blue1']}
            icon={<FontAwesome name='comment' size={20} color={'white'} />}
            onActionButtonPress={() => addImpressionsBottomSheetRef.current.snapToIndex(0)}
          />
        </View>
      </View>
    </View>
  );
};

export default Body;
