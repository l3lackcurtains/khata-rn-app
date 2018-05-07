import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-material-ui';

import Translate from '../../utils/Translate';
import { LPText, LH1Text } from '../../components/Text';
import IncomeBg from '../../assets/images/income-bg.jpeg';
import ExpenseBg from '../../assets/images/expense-bg.jpeg';
import SavingBg from '../../assets/images/saving-bg.jpeg';

const styles = StyleSheet.create({
  wrapper: {
    padding: 8
  },
  topBox: {
    backgroundColor: '#054757',
    margin: -8,
    marginBottom: -32,
    paddingTop: 32,
    paddingBottom: 56
  },
  walletAmount: {
    padding: 16,
    flexDirection: 'row',
    marginLeft: 8
  },
  walletCard: {
    padding: 16,
    flexDirection: 'row'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
});

class WalletScreen extends Component {
  state = {
    totalIncomesAmount: 0,
    totalSavingsAmount: 0,
    totalExpensesAmount: 0,
    totalWalletAmount: 0
  };

  componentDidMount() {
    if (
      this.props.getExpenses.data !== null &&
      this.props.getIncomes.data !== null &&
      this.props.getSavings.data !== null
    ) {
      // update on changes
      this.updateWalletAmount(
        this.props.getIncomes.data,
        this.props.getExpenses.data,
        this.props.getSavings.data
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.getExpenses.data !== null &&
      nextProps.getIncomes.data !== null &&
      nextProps.getSavings.data !== null
    ) {
      // update on changes
      this.updateWalletAmount(
        nextProps.getIncomes.data,
        nextProps.getExpenses.data,
        nextProps.getSavings.data
      );
    }
  }

  updateWalletAmount = (incomes, expenses, savings) => {
    const totalIncomesAmount = incomes.reduce(
      (acc, curr) => acc + parseInt(curr.incomeAmount, 10),
      0
    );

    const totalSavingsAmount = savings.reduce(
      (acc, curr) => acc + parseInt(curr.savingAmount, 10),
      0
    );

    const totalExpensesAmount = expenses.reduce(
      (acc, curr) => acc + parseInt(curr.expenseAmount, 10),
      0
    );

    this.setState({
      totalIncomesAmount,
      totalSavingsAmount,
      totalExpensesAmount,
      totalWalletAmount: totalIncomesAmount - totalExpensesAmount - totalSavingsAmount
    });
  };

  render() {
    const { currencyCode } = this.props.getSettings.data;
    return (
      <View style={styles.wrapper}>
        <View style={styles.topBox}>
          <View style={styles.walletAmount}>
            <View>
              <LPText>
                <Translate id="inWallet">In your wallet</Translate>
              </LPText>
              <LH1Text style={{ fontSize: 40 }}>
                {`${currencyCode} `}
                <Translate id="number">{this.state.totalWalletAmount}</Translate>
              </LH1Text>
            </View>
          </View>
        </View>

        <View>
          <Card>
            <ImageBackground
              style={{
                width: '100%',
                backgroundColor: '#191919'
              }}
              source={IncomeBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>
                    {`${currencyCode} `}
                    <Translate id="number">{this.state.totalIncomesAmount}</Translate>
                  </LH1Text>
                  <LPText>
                    <Translate id="income">Incomes</Translate>
                  </LPText>
                </View>
              </View>
            </ImageBackground>
          </Card>
        </View>

        <View>
          <Card>
            <ImageBackground
              style={{
                width: '100%',
                backgroundColor: '#191919'
              }}
              source={ExpenseBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>
                    {`${currencyCode} `}
                    <Translate id="number">{this.state.totalExpensesAmount}</Translate>
                  </LH1Text>
                  <LPText>
                    <Translate id="expense">Expenses</Translate>
                  </LPText>
                </View>
              </View>
            </ImageBackground>
          </Card>

          <Card>
            <ImageBackground
              style={{
                width: '100%',
                backgroundColor: '#191919'
              }}
              source={SavingBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>
                    {`${currencyCode} `}
                    <Translate id="number">{this.state.totalSavingsAmount}</Translate>
                  </LH1Text>
                  <LPText>
                    <Translate id="saving">Savings</Translate>
                  </LPText>
                </View>
              </View>
            </ImageBackground>
          </Card>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  getExpenses: state.getExpenses,
  getIncomes: state.getIncomes,
  getSavings: state.getSavings,
  getSettings: state.getSettings
}))(WalletScreen);
