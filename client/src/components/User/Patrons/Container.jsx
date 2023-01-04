import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { baseBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import ActionButton from '../../Utils/ActionButton';

const Container = (props) => {
  const [user, setUser] = useState(props.route.params.user);
  const [patrons, setPatrons] = useState([]);

  const getPatronsByLauncherId = async () => {
    const result = await lampostAPI.get(`/launcherandpatronrelationships/${user._id}`);
    const { patrons } = result.data;
    setPatrons(patrons);
  };

  useEffect(() => {
    getPatronsByLauncherId();
  }, []);

  const renderPatrons = () => {
    if (patrons.length) {
      const patronList = patrons.map((user, index) => {
        return (
          <View key={index}>
            <Text>{user.name}</Text>
          </View>
        );
      });

      return <View>{patronList}</View>;
    } else {
      return <Text>No patrons</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
        <ActionButton label='Be a patron' backgroundColor={iconColorsTable['blue1']} onActionButtonPress={() => null} />
      </View>
      {renderPatrons()}
    </View>
  );
};

export default Container;
