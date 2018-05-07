import React, { Component } from 'react';
import moment from 'moment';
import { View, StyleSheet, FlatList, Keyboard } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

import { translateText } from '../../utils/helper';
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
import Translate from '../../utils/Translate';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8
  },
  topBox: {
    flexDirection: 'column',
    backgroundColor: '#054757',
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
  },
  expenseDate: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0984e3',
    textAlign: 'center'
  },
  expenseMonth: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center'
  },
  expenseFrom: {
    fontSize: 16,
    paddingBottom: 4
  },
  expenseMeta: {
    fontSize: 14,
    color: '#555'
  }
});

class ExpenseScreen extends Component {
  state = {
    updateModal: false,
    expenseFrom: '',
    expenseAmount: '',
    expenseFromUpdate: '',
    expenseAmountUpdate: '',
    currentId: '',
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
    const { currencyCode, language } = this.props.getSettings.data;
    return (
      <View style={styles.wrapper}>
        <View style={styles.topBox}>
          <View style={styles.expenseAddForm}>
            <LTextField
              style={styles.expenseAddFormField}
              name="expenseFrom"
              label={translateText(language, 'expenseFrom', 'Expense From')}
              value={this.state.expenseFrom}
              onChangeText={value => this.onChangeField('expenseFrom', value)}
            />
            <LTextField
              style={styles.expenseAddFormField}
              name="expenseAmount"
              label={translateText(language, 'amount', 'Amount')}
              keyboardType="phone-pad"
              value={this.state.expenseAmount}
              onChangeText={value => this.onChangeField('expenseAmount', value)}
            />
          </View>
          <View style={styles.expenseButton}>
            <LH1Text style={styles.expenseTotalPrice}>
              {`${currencyCode} `}
              <Translate id="number">{totalAmount}</Translate>
            </LH1Text>
            <PrimaryButton
              text={translateText(language, 'addExpense', 'Add Expense')}
              disabled={
                !this.state.expenseFrom || !this.state.expenseAmount.toString().match('^\\d+$')
              }
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
                  dense
                  numberOfLines="dynamic"
                  style={{
                    leftElementContainer: {
                      width: 48,
                      marginLeft: 4
                    }
                  }}
                  centerElement={
                    <View>
                      <PText style={styles.expenseFrom}>{item.expenseFrom}</PText>
                      <PText style={styles.expenseMeta}>{moment(item.createdAt).calendar()}</PText>
                    </View>
                  }
                  leftElement={
                    <View>
                      <H2Text style={styles.expenseDate}>
                        {moment(item.createdAt).format('D')}
                      </H2Text>
                      <PText style={styles.expenseMonth}>
                        {moment(item.createdAt).format('MMMM')}
                      </PText>
                    </View>
                  }
                  rightElement={
                    <H2Text style={styles.expensePrice}>
                      {`${currencyCode} `}
                      <Translate id="number">{item.expenseAmount}</Translate>
                    </H2Text>
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
          title={translateText(language, 'editExpense', 'Edit Expense')}
          primaryAction={
            <PrimaryButton
              text={translateText(language, 'update', 'Update')}
              onPress={this.onUpdateExpense}
              disabled={
                !this.state.expenseFromUpdate ||
                !this.state.expenseAmountUpdate.toString().match('^\\d+$')
              }
            />
          }
          secondaryAction={
            <SecondaryButton
              text={translateText(language, 'delete', 'Delete')}
              style={{ text: { color: 'red' } }}
              onPress={this.onRemoveExpense}
            />
          }
        >
          <TextField
            name="expenseFromUpdate"
            label={translateText(language, 'expenseFrom', 'Expense From')}
            value={this.state.expenseFromUpdate}
            onChangeText={value => this.onChangeField('expenseFromUpdate', value)}
          />
          <TextField
            name="expenseAmountUpdate"
            label={translateText(language, 'amount', 'Amount')}
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
