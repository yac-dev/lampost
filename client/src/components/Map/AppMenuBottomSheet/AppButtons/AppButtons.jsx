import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AppButton from './AppButton';
import { iconColorsTable, backgroundColorsTable, sectionBackgroundColor } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setIsConfirmHostMeetupModalOpen } from '../../../../redux/actionCreators/modal';

const AppButtons = (props) => {
  // 何だろう。。。scrollviewをtopのcomponentにするとなんかバグる。
  return (
    <View style={{ paddingTop: 10, marginBottom: 15, borderRadius: 10, backgroundColor: sectionBackgroundColor }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
          label='Launch'
          onActionButtonPress={() => {
            props.setIsConfirmHostMeetupModalOpen(true);
            props.appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
          label='Camera'
          onPress={() => console.log('launch camera')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['green1']}
          icon={<MaterialCommunityIcons name='fire' size={35} color={iconColorsTable['green1']} />}
          label='Live'
        />

        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialCommunityIcons name='history' size={35} color={iconColorsTable['violet1']} />}
          label='Timeline'
        />
        <AppButton
          backgroundColor={backgroundColorsTable['pink1']}
          icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
          label='Search'
        />
        {/* <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        backgroundColor: backgroundColorsTable['red1'],
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      }}
      onPress={() => props.setIsConfirmHostMeetupModalOpen(true)}
    >
      <MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />
    </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default connect(null, { setIsConfirmHostMeetupModalOpen })(AppButtons);
