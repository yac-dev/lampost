// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const BaseRNPModal = (props) => {
  return (
    <Provider>
      <Portal>
        <Dialog visible={props.openDialogOf} onDismiss={() => props.onCloseModal()}>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Content>{props.children}</Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => console.log('Cancel')}>Cancel</Button>
            <Button onPress={() => props.onCloseModal()}>Got it</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, {})(BaseRNPModal);
