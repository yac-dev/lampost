import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, disabledTextColor } from '../../../utils/colorsTable';
import BadgeTagOptions from './BadgeTagOptions';
import BadgeTagTextInput from './BadgeTagTextInput';
import AddedBadgeTags from './AddedBadgeTags';
import CreatedBadgeTags from './CreatedBadgeTags';
import SnackBar from '../../Utils/SnackBar';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const AddBadgeTagsContainer = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [alreadyHaveBadgeTags, setAlreadyHaveBadgeTags] = useState({});
  const [badgeTagOptions, setBadgeTagOptions] = useState({});
  const [isFetchedBadgeTagOptions, setIsFetchedBadgeTagOptions] = useState(false);
  const [createdBadgeTags, setCreatedBadgeTags] = useState({});
  const [addedBadgeTags, setAddedBadgeTags] = useState({});
  const [badgeTagTextInput, setBadgeTagTextInput] = useState('');

  const getBadgeTagsByBadgeId = async () => {
    // やっぱ、自分が持っているものはqueryしない方向はやめようと思う。renderがいちいち面倒くさくなる。
    const result = await lampostAPI.get(`/badgeTags/${props.route.params.badgeId}`); // 今自分が持っているtagだけは除いてqueryする。
    const { badgeTags } = result.data;
    if (badgeTags.length) {
      setBadgeTagOptions((previous) => {
        const updating = { ...previous };
        badgeTags.forEach((badgeTag) => {
          updating[badgeTag.name] = badgeTag;
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
        table[badgeTag.name] = badgeTag;
      });
      return table;
    });
  }, []);

  const onDonePress = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(
      `/badgeanduserrelationships/add/${props.route.params.badgeId}/${auth.data._id}`,
      { addedBadgeTags: Object.values(addedBadgeTags), createdBadgeTags: Object.values(createdBadgeTags) }
    );
    setLoading(false);
    console.log(result.data);
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    // setMyBadges(props.route.params.myBadges);
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={Object.keys(createdBadgeTags).length || Object.keys(addedBadgeTags).length ? false : true}
        >
          <Text
            style={{
              color:
                Object.keys(createdBadgeTags).length || Object.keys(addedBadgeTags).length
                  ? 'white'
                  : disabledTextColor,
              fontSize: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [createdBadgeTags, addedBadgeTags]);

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
        {Object.keys(createdBadgeTags).length || Object.keys(addedBadgeTags).length ? (
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Adding</Text>
            <AddedBadgeTags />
            <CreatedBadgeTags />
          </View>
        ) : null}
      </View>
      <SnackBar />
      <LoadingSpinner />
    </AddBadgeTagsContext.Provider>
  );
};

export default AddBadgeTagsContainer;
