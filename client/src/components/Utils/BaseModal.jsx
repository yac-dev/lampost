// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';

// ac
import { setIsSelectGenreModalOpen } from '../../redux/actionCreators/modal';

const BaseModal = (props) => {
  const render = () => {
    if (props.modal.selectGenre.isOpen) {
      return (
        <View>
          <Modal
            visible={props.modalOpen}
            animationType='slide'
            // transparent={true}
            statusBarTranslucent={true}
            onRequestClose={() => {
              // console.log('modallll');
              props.setIsSelectGenreModalOpen(false);
            }}
          >
            <SafeAreaView>
              <Text>Helllloooo modal</Text>
              <Text>Helllloooo modal</Text>
              <Text>Helllloooo modal</Text>
              <Text>Helllloooo modal</Text>
              <TouchableOpacity onPress={() => props.setIsSelectGenreModalOpen(false)}>
                <Text>close modal</Text>
              </TouchableOpacity>
              <Text>🍕Food & Drink</Text>
              <Text>🛍Shopping</Text>
              <Text>⚽️Activity</Text>
              <Text>🎉Party</Text>
              <Text>🖼Art</Text>
              <Text>🙋Question & Help</Text>
              <Text>💡Dsicovery</Text>
            </SafeAreaView>
          </Modal>
        </View>
      );
    } else {
      return null;
    }
  };

  return <>{render()}</>;
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsSelectGenreModalOpen })(BaseModal);
