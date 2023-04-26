import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import CreateBadgesIndexContext from './createBadgesIndexContext';
import IndexTitle from './IndexTitle';
import AddedBadges from './AddedBadges';
import IndieBadges from './IndieBadges';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [indexTitleTextInput, setIndexTitleTextInput] = useState('');
  const [indieBadges, setIndieBadges] = useState(() => {
    const table = {};
    props.route.params.independentBadges.forEach((userBadge) => {
      table[userBadge._id] = userBadge;
    });
    return table;
  });
  const [addedBadges, setAddedBadges] = useState({});

  const createBadgeSection = async () => {
    const result = await lampostAPI.post(`/badgesections/${auth.data._id}`, { userBadgeIds: Object.keys(addedBadges) });
    const { badgeSection } = result.data;
    props.navigation.navigate('Profile', {
      createdBadgeSection: {
        bool: true,
        badgeSection: { title: badgeSection.title, userBadges: Object.values(addedBadges) },
      },
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => createBadgeSection()} disabled={indexTitleTextInput ? false : true}>
          <Text
            style={{
              color: indexTitleTextInput && Object.values(addedBadges).length ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: indexTitleTextInput && Object.values(addedBadges).length ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [indexTitleTextInput, addedBadges, indieBadges]);

  return (
    <CreateBadgesIndexContext.Provider
      value={{ indexTitleTextInput, setIndexTitleTextInput, indieBadges, setIndieBadges, addedBadges, setAddedBadges }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <View style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}>
          <Text style={{ color: 'white' }}>
            By creating badge section, you can categorize some badges of yours in one space.{'\n'}e.g) My jobs, My
            favorite foods, Currently working on: etc.
          </Text>
        </View>
        <IndexTitle />
        <AddedBadges />
        <IndieBadges />
      </View>
    </CreateBadgesIndexContext.Provider>
  );
};

export default Container;
