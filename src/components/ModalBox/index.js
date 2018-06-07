// @flow
import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-material-ui';
import { Motion, spring } from 'react-motion';

import { LPText } from '../../components/Text';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  dialogBox: {
    alignSelf: 'center',
    width: '92%',
    marginLeft: -1000,
    backgroundColor: '#FAFAFA'
  },
  dialogBoxTitle: {
    padding: 16,
    backgroundColor: '#054757',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dialogBoxContent: {
    padding: 16
  },
  actionButtons: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const ModalBox = props => {
  const { children, title, action, primaryAction, secondaryAction, visible, ...otherProps } = props;
  if (!visible) return <View />;
  return (
    <Modal {...otherProps}>
      <TouchableOpacity style={styles.modalView} onPress={otherProps.onRequestClose}>
        <Motion defaultStyle={{ marginLeft: 500 }} style={{ marginLeft: spring(0) }}>
          {({ marginLeft }) => (
            <Card style={{ container: { ...StyleSheet.flatten([styles.dialogBox]), marginLeft } }}>
              <View style={styles.dialogBoxTitle}>
                <LPText style={{ fontSize: 18 }}>{title}</LPText>
                <MaterialIcons
                  name="close"
                  size={24}
                  color="#fff"
                  onPress={otherProps.onRequestClose}
                />
              </View>
              <View style={styles.dialogBoxContent}>
                {children}
                <View style={styles.actionButtons}>
                  {!!secondaryAction && secondaryAction}
                  {!!primaryAction && primaryAction}
                </View>
              </View>
            </Card>
          )}
        </Motion>
      </TouchableOpacity>
    </Modal>
  );
};
export default ModalBox;
