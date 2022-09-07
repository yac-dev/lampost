// main libraries
import React from 'react';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';

const ModalContainer = (props) => {
  if (props.modalOpen) {
    return (
      <Portal>
        <Dialog visible={props.modalOpen}>
          <Dialog.Content>{props.children}</Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => props.onPressModalOpen()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } else {
    return null;
  }
};

export default ModalContainer;
