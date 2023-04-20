// main libraries
import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
// ac
import { removeSnackBar } from '../../redux/actionCreators/snackBar';

const barTypeColor = {
  success: iconColorsTable['green1'],
  info: iconColorsTable['blue1'],
  warning: iconColorsTable['yellow1'],
  error: iconColorsTable['red1'],
};

const SnackBar = (props) => {
  const { Ionicons, Foundation } = iconsTable;
  const { snackBar, setSnackBar } = useContext(GlobalContext);

  useEffect(() => {
    if (snackBar.isVisible) {
      setTimeout(() => {
        setSnackBar({ isVisible: false, message: '', barType: '', duration: null });
      }, snackBar.duration);
    }
  }, [snackBar.isVisible]);

  const renderBarTypeIcon = () => {
    switch (snackBar.barType) {
      case 'success':
        return <Ionicons name='checkmark-circle' size={20} color={'white'} style={{ marginRight: 10 }} />;
      case 'info':
        return <Ionicons name='information-circle-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />;
      case 'warning':
        return <Ionicons name='ios-warning-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />;
      case 'error':
        return <Foundation name='prohibited' size={20} color={'white'} style={{ marginRight: 10 }} />;
      default:
        return null;
    }
  };

  if (snackBar.isVisible) {
    return (
      <Snackbar
        wrapperStyle={{ top: 0 }}
        style={{
          backgroundColor: barTypeColor[snackBar.barType],
        }}
        visible={snackBar.isVisible}
        onDismiss={() => setSnackBar({ isVisible: false, message: '', barType: '', duration: null })}
        action={{
          label: <Text style={{ color: 'white' }}>Close</Text>,
          onPress: () => setSnackBar({ isVisible: false, message: '', barType: '', duration: null }),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderBarTypeIcon()}
          <Text style={{ color: 'white' }}>{snackBar.message}</Text>
        </View>
      </Snackbar>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { snackBar: state.snackBar };
};

export default connect(mapStateToProps, { removeSnackBar })(SnackBar);
