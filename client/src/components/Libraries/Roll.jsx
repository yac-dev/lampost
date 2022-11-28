import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import lampostAPI from '../../apis/lampost';

import Assets from '../Assets/Container';

const Roll = (props) => {
  const [roll, setRoll] = useState(null);
  const [assets, setAssets] = useState([]);

  // relationship {_id: 1111, roll: 2222, asset: {name: 'kkkkk', data: 'https://wuuuuu'}}

  const getRoll = async () => {
    const result = await lampostAPI.get(`/rolls/${props.route.params.rollId}`);
    const { roll, assets } = result.data;
    setRoll(roll);
    setAssets(assets);
  };
  useEffect(() => {
    getRoll();
  }, []);

  return (
    <View>
      <Text>{roll ? roll.name : 'now loading'}</Text>
      <Assets assets={assets} />
    </View>
  );
};

export default Roll;
