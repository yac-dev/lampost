// main libraries
import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable } from '../../utils/colorsTable';
// ac
import { removeSnackBar } from '../../redux/actionCreators/snackBar';

const SnackBar = (props) => {
  const { snackBar, setSnackBar } = useContext(GlobalContext);

  useEffect(() => {
    if (snackBar.isVisible) {
      setTimeout(() => {
        setSnackBar({ isVisible: false, message: '', barType: '', duration: null });
      }, snackBar.duration);
    }
  }, [snackBar.isVisible]);

  if (snackBar.isVisible) {
    return (
      <Snackbar
        wrapperStyle={{ top: 0 }}
        style={{
          backgroundColor:
            snackBar.barType === 'success'
              ? iconColorsTable['blue1']
              : 'warning'
              ? iconColorsTable['yellow1']
              : iconColorsTable['red1'],
        }}
        visible={snackBar.isVisible}
        onDismiss={() => setSnackBar({ isVisible: false, message: '', barType: '', duration: null })}
        action={{
          label: <Text style={{ color: 'white' }}>Close</Text>,
          onPress: () => setSnackBar({ isVisible: false, message: '', barType: '', duration: null }),
        }}
      >
        <Text style={{ color: 'white' }}>{snackBar.message}</Text>
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
