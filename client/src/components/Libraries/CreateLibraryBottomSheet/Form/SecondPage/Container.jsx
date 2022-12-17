import React, { useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import LibrariesContext from '../../../LibrariesContext';
import FormContext from '../../FormContext';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { View, Text } from 'react-native';
import Assets from './Assets';
import Description from './Description';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';

const Container = () => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const { createLibraryBottomSheetRef } = useContext(LibrariesContext);
  const { setPage, formData } = useContext(FormContext);

  const onLaunchPress = async () => {
    const launcher = {
      _id: auth.data._id,
      name: auth.data.name,
      photo: auth.data.photo,
    };

    const payload = {
      name: formData.name,
      badges: Object.values(formData.badges),
      description: formData.description,
      rolls: formData.assets,
      launcher,
    };

    console.log(payload);

    createLibraryBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: 'Launched your library.',
      barType: 'success',
      duration: 5000,
    });
    // 正直、socketである必要ないわ。
    // if (!formData.name) {
    //   return console.log('no name');
    // }
    // auth.socket.emit('CREATE_LIBRARY', body);
    // これ、完了してからsnack barを出しましょう。
    // return () => {
    //   auth.socket.off('CREATE_LIBRARY');
    // };
    // const result = await lampostAPI.post('/libraries', body);
  };

  return (
    <View>
      <Description />
      <Assets />
      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => setPage('FIRST_PAGE')}
        />
        <ActionButton
          label='Launch'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} />}
          onActionButtonPress={() => onLaunchPress()}
        />
      </View>
    </View>
  );
};

export default Container;
