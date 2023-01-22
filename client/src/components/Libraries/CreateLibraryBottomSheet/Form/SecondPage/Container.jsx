import React, { useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import LibrariesContext from '../../../LibrariesContext';
import FormContext from '../../FormContext';
import lampostAPI from '../../../../../apis/lampost';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { View, Text } from 'react-native';
import Assets from './Assets';
import Description from './Description';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';

const Container = () => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const { createLibraryBottomSheetRef, setMyJoinedLibraries, setLibraries } = useContext(LibrariesContext);
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
      asset: {
        _id: formData.asset._id,
        badges: formData.asset.badges,
        data: formData.asset.data,
      },
      launcher,
    };

    const result = await lampostAPI.post(`/libraries`, payload);
    const { library } = result.data;
    setMyJoinedLibraries((previous) => [...previous, library]);
    setLibraries((previous) => [...previous, library]);
    createLibraryBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: 'Launched your library.',
      barType: 'success',
      duration: 5000,
    });
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
          label='Done'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} />}
          onActionButtonPress={() => onLaunchPress()}
        />
      </View>
    </View>
  );
};

export default Container;
