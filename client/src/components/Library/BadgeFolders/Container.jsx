import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import lampostAPI from '../../../apis/lampost';

// components
import BadgeFolder from './BadgeFolder';

const Container = (props) => {
  const [badgeFolders, setBadgeFolders] = useState([]);

  const getBadgeFolders = async () => {
    const result = await lampostAPI('/badges/rolls');
    const { badgeFolders } = result.data;
    setBadgeFolders(badgeFolders);
  };

  useEffect(() => {
    getBadgeFolders();
  }, []);

  const renderBadgeFolders = () => {
    if (badgeFolders.length) {
      const badgeFoldersList = badgeFolders.map((badgeFolder, index) => {
        return <BadgeFolder key={index} badgeFolder={badgeFolder} onSelectBadgeFolder={props.onSelectBadgeFolder} />;
      });

      return <View>{badgeFoldersList}</View>;
    } else {
      return null;
    }
  };
  return <ScrollView style={{ padding: 20 }}>{renderBadgeFolders()}</ScrollView>;
};

export default Container;
