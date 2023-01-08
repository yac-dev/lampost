import React from 'react';
import { View, Text } from 'react-native';

const Datee = (props) => {
  const renderDate = () => {
    const dateString = new Date(props.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(94, 97, 103)' }}>{dateString}</Text>;
  };

  return <>{renderDate()}</>;
};

export default Datee;
