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
  addIncomeReq,
  addIncomeReset,
  getIncomesReq,
  updateIncomeReq,
  updateIncomeReset,
  removeIncomeReq,
  removeIncomeReset
} from '../../redux/actions/incomeAc';
import Translate from '../../utils/Translate';

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
  incomeTotalPrice: {
    fontSize: 24
  },
  incomeButton: {
    marginHorizontal: -8,
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  incomeAddForm: {
    flexDirection: 'row'
  },
  incomeAddFormField: {
    width: '50%',
    padding: 8
  },
  incomeList: {
    paddingHorizontal: 8,
    marginHorizontal: -8,
    padding: 0
  },
  incomePrice: {
    marginRight: 16,
    fontSize: 16,
    fontFamily: 'lato-regular'
  },
  incomeDate: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0984e3'
  },
  incomeMonth: {
    fontSize: 12,
    color: '#555'
  },
  incomeFrom: {
    fontSize: 16,
    paddingBottom: 4
  },
  incomeMeta: {
    fontSize: 14,
    color: '#555'
  }
});

class IncomeScreen extends Component {
  state = {
    updateModal: false,
    incomeFrom: '',
    incomeAmount: '',
    incomeFromUpdate: '',
    incomeAmountUpdate: '',
    currentId: '',
    totalAmount: 0
  };

  componentDidMount = () => {
    if (this.props.getIncomes.isReceived && this.props.getIncomes.data !== null) {
      this.updateTotalAmount(this.props.getIncomes.data);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.addIncome.isReceived) {
      this.props.dispatch(addIncomeReset());
      const query = {};
      this.props.dispatch(getIncomesReq(query));
    }

    if (nextProps.updateIncome.isReceived) {
      this.props.dispatch(updateIncomeReset());
      const query = {};
      this.props.dispatch(getIncomesReq(query));
    }

    if (nextProps.removeIncome.isReceived) {
      this.props.dispatch(removeIncomeReset());
      const query = {};
      this.props.dispatch(getIncomesReq(query));
    }

    if (nextProps.getIncomes.data !== null) {
      // update on changes
      this.updateTotalAmount(nextProps.getIncomes.data);
    }
  }

  onAddIncome = () => {
    const { incomeAmount, incomeFrom } = this.state;
    const query = { incomeAmount, incomeFrom };
    this.props.dispatch(addIncomeReq(query));
    this.setState({
      incomeAmount: null,
      incomeFrom: null
    });
    Keyboard.dismiss();
  };

  onUpdateIncome = () => {
    const { incomeAmountUpdate, incomeFromUpdate } = this.state;
    const id = this.state.currentId;
    const query = {
      incomeAmount: incomeAmountUpdate,
      incomeFrom: incomeFromUpdate,
      id
    };
    this.props.dispatch(updateIncomeReq(query));
    this.setState({
      incomeAmount: null,
      incomeFrom: null
    });
    this.closeModal('updateModal');
  };

  onRemoveIncome = () => {
    const id = this.state.currentId;
    const query = { id };
    this.props.dispatch(removeIncomeReq(query));
    this.setState({
      incomeAmount: null,
      incomeFrom: null
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
      incomeFromUpdate: inco.incomeFrom,
      incomeAmountUpdate: inco.incomeAmount
    });
  }

  closeModal(name) {
    this.setState({
      [name]: false,
      currentId: null,
      incomeAmount: null,
      incomeFrom: null
    });
  }

  updateTotalAmount = arr => {
    const totalAmount =
      arr.length > 0 ? arr.reduce((acc, curr) => acc + parseInt(curr.incomeAmount, 10), 0) : 0;
    this.setState({ totalAmount });
  };

  render() {
    const incomes = this.props.getIncomes;
    const { totalAmount } = this.state;
    const { currencyCode, language } = this.props.getSettings.data;
    return (
      <View style={styles.wrapper}>
        <View style={styles.topBox}>
          <View style={styles.incomeAddForm}>
            <LTextField
              style={styles.incomeAddFormField}
              name="incomeFrom"
              label={translateText(language, 'incomeFrom', 'Income From')}
              value={this.state.incomeFrom}
              onChangeText={value => this.onChangeField('incomeFrom', value)}
            />
            <LTextField
              style={styles.incomeAddFormField}
              name="incomeAmount"
              label={translateText(language, 'amount', 'Amount')}
              keyboardType="phone-pad"
              value={this.state.incomeAmount}
              onChangeText={value => this.onChangeField('incomeAmount', value)}
            />
          </View>
          <View style={styles.incomeButton}>
            <LH1Text style={styles.incomeTotalPrice}>
              {`${currencyCode} `}
              <Translate id="number">{totalAmount}</Translate>
            </LH1Text>
            <PrimaryButton
              text={translateText(language, 'addIncome', 'Add Income')}
              disabled={!this.state.incomeFrom || !this.state.incomeAmount}
              onPress={this.onAddIncome}
            />
          </View>
        </View>
        {incomes.Loading ? (
          <PText>Loading</PText>
        ) : incomes.length === 0 ? (
          <View />
        ) : (
          <FlatList
            style={styles.incomeList}
            data={incomes.data}
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
                      <PText style={styles.incomeFrom}>{item.incomeFrom}</PText>
                      <PText style={styles.incomeMeta}>{moment(item.createdAt).calendar()}</PText>
                    </View>
                  }
                  leftElement={
                    <View>
                      <H2Text style={styles.incomeDate}>
                        {moment(item.createdAt).format('D')}
                      </H2Text>
                      <PText style={styles.incomeMonth}>
                        {moment(item.createdAt).format('MMMM')}
                      </PText>
                    </View>
                  }
                  rightElement={
                    <H2Text style={styles.incomePrice}>
                      {`${currencyCode} `}
                      <Translate id="number">{item.incomeAmount}</Translate>
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
          title={translateText(language, 'editIncome', 'Edit Income')}
          primaryAction={
            <PrimaryButton
              text={translateText(language, 'update', 'Update')}
              onPress={this.onUpdateIncome}
              disabled={!this.state.incomeFromUpdate || !this.state.incomeAmountUpdate}
            />
          }
          secondaryAction={
            <SecondaryButton
              text={translateText(language, 'delete', 'Delete')}
              style={{ text: { color: 'red' } }}
              onPress={this.onRemoveIncome}
            />
          }
        >
          <TextField
            name="incomeFromUpdate"
            label={translateText(language, 'incomeFrom', 'Income From')}
            value={this.state.incomeFromUpdate}
            onChangeText={value => this.onChangeField('incomeFromUpdate', value)}
          />
          <TextField
            name="incomeAmountUpdate"
            label={translateText(language, 'amount', 'Amount')}
            keyboardType="phone-pad"
            value={this.state.incomeAmountUpdate}
            onChangeText={value => this.onChangeField('incomeAmountUpdate', value)}
          />
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  addIncome: state.addIncome,
  getIncomes: state.getIncomes,
  removeIncome: state.removeIncome,
  updateIncome: state.updateIncome,
  getSettings: state.getSettings
}))(IncomeScreen);
