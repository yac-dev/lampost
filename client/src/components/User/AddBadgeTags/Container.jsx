import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import BadgeTagOptions from './BadgeTagOptions';
import BadgeTagTextInput from './BadgeTagTextInput';
import AddedBadgeTags from './AddedBadgeTags';
import CreatedBadgeTags from './CreatedBadgeTags';

const AddBadgeTagsContainer = (props) => {
  const { setLoading } = useContext(GlobalContext);
  const [alreadyHaveBadgeTags, setAlreadyHaveBadgeTags] = useState({});
  const [badgeTagOptions, setBadgeTagOptions] = useState({});
  const [isFetchedBadgeTagOptions, setIsFetchedBadgeTagOptions] = useState(false);
  const [createdBadgeTags, setCreatedBadgeTags] = useState({});
  const [addedBadgeTags, setAddedBadgeTags] = useState({});
  const [badgeTagTextInput, setBadgeTagTextInput] = useState('');
  // header rightもつけないといけない。

  const getBadgeTagsByBadgeId = async () => {
    // やっぱ、自分が持っているものはqueryしない方向はやめようと思う。renderがいちいち面倒くさくなる。
    const result = await lampostAPI.get(`/badgeTags/${props.route.params.badgeId}`); // 今自分が持っているtagだけは除いてqueryする。
    const { badgeTags } = result.data;
    console.log('result', badgeTags);
    if (badgeTags.length) {
      setBadgeTagOptions((previous) => {
        const updating = { ...previous };
        badgeTags.forEach((badgeTag) => {
          updating[badgeTag._id] = badgeTag;
        });
        return updating;
      });
    }
    setIsFetchedBadgeTagOptions(true);
  };

  useEffect(() => {
    getBadgeTagsByBadgeId();
  }, []);

  useEffect(() => {
    setAlreadyHaveBadgeTags(() => {
      const table = {};
      props.route.params.badgeTags.forEach((badgeTag) => {
        table[badgeTag._id] = badgeTag;
      });
      return table;
    });
  }, []);

  useEffect(() => {
    // setMyBadges(props.route.params.myBadges);
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('badge tags')}>
          <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <AddBadgeTagsContext.Provider
      value={{
        badgeTagOptions,
        setBadgeTagOptions,
        alreadyHaveBadgeTags,
        badgeTagTextInput,
        setBadgeTagTextInput,
        createdBadgeTags,
        setCreatedBadgeTags,
        addedBadgeTags,
        setAddedBadgeTags,
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
      >
        <BadgeTagOptions />
        <BadgeTagTextInput />
        <View style={{ color: 'white' }}>
          <Text style={{ color: 'red' }}>Adding</Text>
          <AddedBadgeTags />
          <CreatedBadgeTags />
        </View>
      </View>
    </AddBadgeTagsContext.Provider>
  );
};

export default AddBadgeTagsContainer;
