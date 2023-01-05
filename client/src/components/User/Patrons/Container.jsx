import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../Utils/ActionButton';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [user, setUser] = useState(props.route.params.user);
  const [isMyPage, setIsMyPage] = useState(false);
  const [patrons, setPatrons] = useState({});
  const [isPatronsDataFetched, setIsPatronsDataFetched] = useState(false);
  const AvatarWidth = Dimensions.get('window').width / 6;

  const getPatronsByLauncherId = async () => {
    const result = await lampostAPI.get(`/launcherandpatronrelationships/${user._id}`);
    const { patrons } = result.data;
    const patronsTable = {};
    patrons.forEach((patron) => {
      patronsTable[patron._id] = patron;
    });
    setPatrons(patronsTable);
    setIsPatronsDataFetched(true);
  };

  useEffect(() => {
    getPatronsByLauncherId();
  }, []);

  const onBeAPatronPress = async () => {
    if (!isPatronsDataFetched) {
      console.log('Not yet!');
    } else {
      console.log(`Launcher is ${user.name} and ${auth.data.name} becoming a patron.`);
      const result = await lampostAPI.post(`/launcherandpatronrelationships/`, {
        launcherId: user._id,
        patron: { _id: auth.data._id, name: auth.data.name, photo: auth.data.photo },
      });
      const { patron } = result.data;
      // const patron = { _id: auth.data._id, name: auth.data.name, photo: auth.data.photo };
      setPatrons((previous) => {
        return {
          ...previous,
          [patron._id]: patron,
        };
      });
    }
  };

  useEffect(() => {
    if (auth.data._id === props.route.params.user._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const renderPatrons = () => {
    const patronsList = Object.values(patrons);
    if (patronsList.length) {
      const list = patronsList.map((user, index) => {
        return (
          <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            {user.photo ? (
              <Image
                source={{ uri: user.photo }}
                style={{ borderRadius: 10, width: 35, aspectRatio: 1, marginRight: 20 }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 10,
                  width: 35,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                }}
              >
                <FontAwesome5 name='user-astronaut' size={20} color='white' />
              </View>
            )}
            <Text style={{ color: baseTextColor }}>{user.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View>{list}</View>;
    } else if (!patronsList.length) {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>
          You'll see all the people who support {user.name}.
        </Text>
      );
    } else {
      <Text style={{ color: 'white' }}>Now loading...</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 30 }}>
        {user.photo ? (
          <Image
            source={{ uri: user.photo }}
            style={{ borderRadius: 10, width: AvatarWidth, aspectRatio: 1, marginRight: 20 }}
          />
        ) : (
          <View
            style={{
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 10,
              width: AvatarWidth,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <FontAwesome5 name='user-astronaut' size={40} color='white' />
          </View>
        )}

        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{user.name}</Text>
          {/* {isMyPage ? null : (
            <ActionButton
              label='Be a patron'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => null}
              icon={<MaterialCommunityIcons name='fire' size={25} color={'white'} />}
            />
          )} 最終的にはこれに書き換える。自分自身をpatronにできないようにするためにね。 
          updateでは、launcherが自分のpatronになるために必要な金額なりを設定できるようにする。これが、俺の収益システムの一つになるかもね。
          */}
          {patrons[auth.data._id] ? null : (
            <ActionButton
              label='Be a patron'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => onBeAPatronPress()}
              icon={<MaterialCommunityIcons name='fire' size={25} color={'white'} />}
            />
          )}
        </View>
      </View>
      {renderPatrons()}
    </View>
  );
};

export default Container;
