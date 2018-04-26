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
  addExpenseReq,
  addExpenseReset,
  getExpensesReq,
  updateExpenseReq,
  updateExpenseReset,
  removeExpenseReq,
  removeExpenseReset
} from '../../redux/actions/expenseAc';

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
  expenseTotalPrice: {
    fontSize: 24
  },
  expenseButton: {
    marginHorizontal: -8,
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expenseAddForm: {
    flexDirection: 'row'
  },
  expenseAddFormField: {
    width: '50%',
    padding: 8
  },
  expenseList: {
    paddingHorizontal: 8,
    marginHorizontal: -8,
    padding: 0
  },
  expensePrice: {
    marginRight: 16,
    fontSize: 16,
    fontFamily: 'lato-regular'
  }
});

class ExpenseScreen extends Component {
  state = {
    updateModal: false,
    expenseFrom: null,
    expenseAmount: null,
    expenseFromUpdate: null,
    expenseAmountUpdate: null,
    currentId: null,
    totalAmount: 0
  };

  componentDidMount = () => {
    if (this.props.getExpenses.isReceived && this.props.getExpenses.data !== null) {
      this.updateTotalAmount(this.props.getExpenses.data);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.addExpense.isReceived) {
      this.props.dispatch(addExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }

    if (nextProps.updateExpense.isReceived) {
      this.props.dispatch(updateExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }

    if (nextProps.removeExpense.isReceived) {
      this.props.dispatch(removeExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }

    if (nextProps.getExpenses.data !== null) {
      // update on changes
      this.updateTotalAmount(nextProps.getExpenses.data);
    }
  }

  onAddExpense = () => {
    const { expenseAmount, expenseFrom } = this.state;
    const query = { expenseAmount, expenseFrom };
    this.props.dispatch(addExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
    });
    Keyboard.dismiss();
  };

  onUpdateExpense = () => {
    const { expenseAmountUpdate, expenseFromUpdate } = this.state;
    const id = this.state.currentId;
    const query = {
      expenseAmount: expenseAmountUpdate,
      expenseFrom: expenseFromUpdate,
      id
    };
    this.props.dispatch(updateExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
    });
    this.closeModal('updateModal');
  };

  onRemoveExpense = () => {
    const id = this.state.currentId;
    const query = { id };
    this.props.dispatch(removeExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
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
      expenseFromUpdate: inco.expenseFrom,
      expenseAmountUpdate: inco.expenseAmount
    });
  }

  closeModal(name) {
    this.setState({
      [name]: false,
      currentId: null,
      expenseAmount: null,
      expenseFrom: null
    });
  }

  updateTotalAmount = arr => {
    const totalAmount =
      arr.length > 0 ? arr.reduce((acc, curr) => acc + parseInt(curr.expenseAmount, 10), 0) : 0;
    this.setState({ totalAmount });
  };

  render() {
    const expenses = this.props.getExpenses;
    const { totalAmount } = this.state;
    const { currencyCode } = this.props.getSettings.data;
    return (
      <View style={styles.wrapper}>
        <View style={styles.topBox}>
          <View style={styles.expenseAddForm}>
            <LTextField
              style={styles.expenseAddFormField}
              name="expenseFrom"
              label="Expense From"
              value={this.state.expenseFrom}
              onChangeText={value => this.onChangeField('expenseFrom', value)}
            />
            <LTextField
              style={styles.expenseAddFormField}
              name="expenseAmount"
              label="Amount"
              keyboardType="phone-pad"
              value={this.state.expenseAmount}
              onChangeText={value => this.onChangeField('expenseAmount', value)}
            />
          </View>
          <View style={styles.expenseButton}>
            <LH1Text style={styles.expenseTotalPrice}>{`${currencyCode} ${totalAmount}`}</LH1Text>
            <PrimaryButton
              text="Add Expense"
              disabled={!this.state.expenseFrom || !this.state.expenseAmount}
              onPress={this.onAddExpense}
            />
          </View>
        </View>
        {expenses.Loading ? (
          <PText>Loading</PText>
        ) : expenses.length === 0 ? (
          <View />
        ) : (
          <FlatList
            style={styles.expenseList}
            data={expenses.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card>
                <ListItem
                  divider
                  style={{
                    primaryText: {
                      fontFamily: 'Roboto'
                    },
                    secondaryText: {
                      fontFamily: 'Roboto'
                    }
                  }}
                  centerElement={{
                    primaryText: item.expenseFrom,
                    secondaryText: `${moment(item.createdAt).calendar()} · ${moment(
                      item.createdAt
                    ).format('D MMMM, YYYY')}`
                  }}
                  rightElement={
                    <H2Text style={styles.expensePrice}>{`${currencyCode} ${
                      item.expenseAmount
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
          animationType="none"
          onRequestClose={() => this.closeModal('updateModal')}
          transparent
          title="Edit Expense"
          primaryAction={
            <PrimaryButton
              text="Update"
              onPress={this.onUpdateExpense}
              disabled={!this.state.expenseFromUpdate || !this.state.expenseAmountUpdate}
            />
          }
          secondaryAction={
            <SecondaryButton
              text="Delete"
              style={{ text: { color: 'red' } }}
              onPress={this.onRemoveExpense}
            />
          }
        >
          <TextField
            name="expenseFromUpdate"
            label="Expense From"
            value={this.state.expenseFromUpdate}
            onChangeText={value => this.onChangeField('expenseFromUpdate', value)}
          />
          <TextField
            name="expenseAmountUpdate"
            label="Amount"
            keyboardType="phone-pad"
            value={this.state.expenseAmountUpdate}
            onChangeText={value => this.onChangeField('expenseAmountUpdate', value)}
          />
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  addExpense: state.addExpense,
  getExpenses: state.getExpenses,
  removeExpense: state.removeExpense,
  updateExpense: state.updateExpense,
  getSettings: state.getSettings
}))(ExpenseScreen);
