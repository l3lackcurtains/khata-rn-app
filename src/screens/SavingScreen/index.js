import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, Keyboard } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

import { PText } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';
import IncomingImage from '../../assets/images/saving.png';

import {
  addSavingReq,
  addSavingReset,
  getSavingsReq,
  updateSavingReq,
  updateSavingReset,
  removeSavingReq,
  removeSavingReset
} from '../../redux/actions/savingAc';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8
  },
  savingHeader: {
    flexDirection: 'column',
    backgroundColor: '#E3F2FD',
    marginHorizontal: -8,
    marginTop: -8,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2'
  },
  savingInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  savingCard: {
    marginHorizontal: -8,
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  savingAddForm: {
    flexDirection: 'row'
  },
  savingAddFormField: {
    width: '50%',
    padding: 8
  },
  savingImage: {
    height: 32,
    width: 32,
    marginRight: 16
  },
  savingTotal: {
    fontWeight: '700',
    fontSize: 24
  },
  savingList: {
    paddingHorizontal: 8,
    marginHorizontal: -8,
    padding: 0
  }
});

class SavingScreen extends Component {
  state = {
    updateModal: false,
    savingFrom: null,
    savingAmount: null,
    savingFromUpdate: null,
    savingAmountUpdate: null,
    currentId: null,
    totalAmount: 0
  };

  componentDidMount = async () => {
    const query = {};
    this.props.dispatch(getSavingsReq(query));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.addSaving.isReceived) {
      this.props.dispatch(addSavingReset());
      const query = {};
      this.props.dispatch(getSavingsReq(query));
    }

    if (nextProps.updateSaving.isReceived) {
      this.props.dispatch(updateSavingReset());
      const query = {};
      this.props.dispatch(getSavingsReq(query));
    }

    if (nextProps.removeSaving.isReceived) {
      this.props.dispatch(removeSavingReset());
      const query = {};
      this.props.dispatch(getSavingsReq(query));
    }
    if (nextProps.getSavings.data !== null) {
      // update on changes
      this.updateTotalAmount(nextProps.getSavings.data);
    }
  }

  onAddSaving = () => {
    const { savingAmount, savingFrom } = this.state;
    const query = { savingAmount, savingFrom };
    this.props.dispatch(addSavingReq(query));
    this.setState({
      savingAmount: null,
      savingFrom: null
    });
    Keyboard.dismiss();
  };

  onUpdateSaving = () => {
    const { savingAmountUpdate, savingFromUpdate } = this.state;
    const index = this.state.currentId;
    const query = { savingAmount: savingAmountUpdate, savingFrom: savingFromUpdate, index };
    this.props.dispatch(updateSavingReq(query));
    this.setState({
      savingAmount: null,
      savingFrom: null
    });
    this.closeModal('updateModal');
  };

  onRemoveSaving = () => {
    const index = this.state.currentId;
    const query = { index };
    this.props.dispatch(removeSavingReq(query));
    this.setState({
      savingAmount: null,
      savingFrom: null
    });
    this.closeModal('updateModal');
  };

  // Change field helper
  onChangeField = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  // Modal helper
  openModal(name) {
    this.setState({ [name]: true });
  }

  openUpdateModal(sav, index) {
    this.setState({
      updateModal: true,
      currentId: index,
      savingFromUpdate: sav.savingFrom,
      savingAmountUpdate: sav.savingAmount
    });
  }

  closeModal(name) {
    this.setState({
      [name]: false,
      currentId: null,
      savingAmount: null,
      savingFrom: null
    });
  }

  updateTotalAmount = arr => {
    const totalAmount = arr.reduce((acc, curr) => acc + parseInt(curr.savingAmount, 10), 0);
    this.setState({ totalAmount });
  };

  render() {
    const savings = this.props.getSavings;
    const { totalAmount } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.savingHeader}>
          <View style={styles.savingAddForm}>
            <TextField
              style={styles.savingAddFormField}
              name="savingFrom"
              label="Saving For"
              value={this.state.savingFrom}
              onChangeText={value => this.onChangeField('savingFrom', value)}
            />
            <TextField
              style={styles.savingAddFormField}
              name="savingAmount"
              label="Amount"
              keyboardType="phone-pad"
              value={this.state.savingAmount}
              onChangeText={value => this.onChangeField('savingAmount', value)}
            />
          </View>
          <View style={styles.savingCard}>
            <View style={styles.savingInfo}>
              <Image style={styles.savingImage} source={IncomingImage} />
              <PText style={styles.savingTotal}>Rs. {totalAmount}</PText>
            </View>
            <View>
              <PrimaryButton
                text="Add Saving"
                disabled={!this.state.savingFrom || !this.state.savingAmount}
                onPress={this.onAddSaving}
              />
            </View>
          </View>
        </View>
        {savings.Loading ? (
          <PText>Loading</PText>
        ) : (
          <FlatList
            style={styles.savingList}
            data={savings.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <Card>
                <ListItem
                  divider
                  centerElement={{
                    primaryText: item.savingFrom,
                    secondaryText: `Rs. ${item.savingAmount}`
                  }}
                  onPress={() => this.openUpdateModal(item, index)}
                />
              </Card>
            )}
          />
        )}
        <ModalBox
          visible={this.state.updateModal}
          animationType="fade"
          onRequestClose={() => this.closeModal('updateModal')}
          transparent
          title="Edit Saving"
          primaryAction={
            <PrimaryButton
              text="Update"
              onPress={this.onUpdateSaving}
              disabled={!this.state.savingFromUpdate || !this.state.savingAmountUpdate}
            />
          }
          secondaryAction={
            <SecondaryButton
              text="Delete"
              style={{ text: { color: 'red' } }}
              onPress={this.onRemoveSaving}
            />
          }
        >
          <TextField
            name="savingFromUpdate"
            label="Saving From"
            value={this.state.savingFromUpdate}
            onChangeText={value => this.onChangeField('savingFromUpdate', value)}
          />
          <TextField
            name="savingAmountUpdate"
            label="Amount"
            keyboardType="phone-pad"
            value={this.state.savingAmountUpdate}
            onChangeText={value => this.onChangeField('savingAmountUpdate', value)}
          />
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  addSaving: state.addSaving,
  getSavings: state.getSavings,
  removeSaving: state.removeSaving,
  updateSaving: state.updateSaving
}))(SavingScreen);
