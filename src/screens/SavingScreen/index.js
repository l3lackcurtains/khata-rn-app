import React, { Component } from 'react';
import moment from 'moment';
import { View, StyleSheet, FlatList, Keyboard } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

import { PText, H2Text, LH1Text } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField, LTextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';

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
  topBox: {
    flexDirection: 'column',
    backgroundColor: '#2c3e50',
    marginHorizontal: -8,
    marginTop: -8,
    padding: 8,
    marginBottom: -32,
    paddingBottom: 48,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2'
  },
  savingTotalPrice: {
    fontSize: 24
  },
  savingButton: {
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
  savingList: {
    paddingHorizontal: 8,
    marginHorizontal: -8,
    padding: 0
  },
  savingPrice: {
    marginRight: 16,
    fontSize: 16,
    fontFamily: 'lato-regular'
  },
  savingDate: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0984e3'
  },
  savingMonth: {
    fontSize: 12,
    color: '#555'
  },
  savingFrom: {
    fontSize: 16,
    paddingBottom: 4
  },
  savingMeta: {
    fontSize: 14,
    color: '#555'
  }
});

class SavingScreen extends Component {
  state = {
    updateModal: false,
    savingFrom: '',
    savingAmount: '',
    savingFromUpdate: '',
    savingAmountUpdate: '',
    currentId: '',
    totalAmount: 0
  };

  componentDidMount = () => {
    if (this.props.getSavings.isReceived && this.props.getSavings.data !== null) {
      this.updateTotalAmount(this.props.getSavings.data);
    }
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
    const id = this.state.currentId;
    const query = {
      savingAmount: savingAmountUpdate,
      savingFrom: savingFromUpdate,
      id
    };
    this.props.dispatch(updateSavingReq(query));
    this.setState({
      savingAmount: null,
      savingFrom: null
    });
    this.closeModal('updateModal');
  };

  onRemoveSaving = () => {
    const id = this.state.currentId;
    const query = { id };
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

  openUpdateModal(inco) {
    this.setState({
      updateModal: true,
      currentId: inco.id,
      savingFromUpdate: inco.savingFrom,
      savingAmountUpdate: inco.savingAmount
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
    const totalAmount =
      arr.length > 0 ? arr.reduce((acc, curr) => acc + parseInt(curr.savingAmount, 10), 0) : 0;
    this.setState({ totalAmount });
  };

  render() {
    const savings = this.props.getSavings;
    const { totalAmount } = this.state;
    const { currencyCode } = this.props.getSettings.data;
    return (
      <View style={styles.wrapper}>
        <View style={styles.topBox}>
          <View style={styles.savingAddForm}>
            <LTextField
              style={styles.savingAddFormField}
              name="savingFrom"
              label="Saving From"
              value={this.state.savingFrom}
              onChangeText={value => this.onChangeField('savingFrom', value)}
            />
            <LTextField
              style={styles.savingAddFormField}
              name="savingAmount"
              label="Amount"
              keyboardType="phone-pad"
              value={this.state.savingAmount}
              onChangeText={value => this.onChangeField('savingAmount', value)}
            />
          </View>
          <View style={styles.savingButton}>
            <LH1Text style={styles.savingTotalPrice}>{`${currencyCode} ${totalAmount}`}</LH1Text>
            <PrimaryButton
              text="Add Saving"
              disabled={!this.state.savingFrom || !this.state.savingAmount}
              onPress={this.onAddSaving}
            />
          </View>
        </View>
        {savings.Loading ? (
          <PText>Loading</PText>
        ) : savings.length === 0 ? (
          <View />
        ) : (
          <FlatList
            style={styles.savingList}
            data={savings.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card>
                <ListItem
                  divider
                  dense
                  numberOfLines="dynamic"
                  style={{
                    centerElementContainer: {
                      marginLeft: -20
                    }
                  }}
                  centerElement={
                    <View>
                      <PText style={styles.savingFrom}>{item.savingFrom}</PText>
                      <PText style={styles.savingMeta}>{moment(item.createdAt).calendar()}</PText>
                    </View>
                  }
                  leftElement={
                    <View>
                      <H2Text style={styles.savingDate}>
                        {moment(item.createdAt).format('D')}
                      </H2Text>
                      <PText style={styles.savingMonth}>
                        {moment(item.createdAt).format('MMMM')}
                      </PText>
                    </View>
                  }
                  rightElement={
                    <H2Text style={styles.savingPrice}>{`${currencyCode} ${
                      item.savingAmount
                    }`}</H2Text>
                  }
                  onPress={() => this.openUpdateModal(item)}
                />
              </Card>
            )}
          />
        )}
        <ModalBox
          visible={this.state.updateModal}
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
  updateSaving: state.updateSaving,
  getSettings: state.getSettings
}))(SavingScreen);
