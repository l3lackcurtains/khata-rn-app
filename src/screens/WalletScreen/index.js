import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Card } from 'react-native-material-ui';

import { LPText, LH1Text } from '../../components/Text';
import WalletImage from '../../assets/images/wallet.png';
import IncomeBg from '../../assets/images/income-bg.jpeg';
import ExpenseBg from '../../assets/images/expense-bg.jpeg';
import SavingBg from '../../assets/images/saving-bg.jpeg';

const styles = StyleSheet.create({
  wrapper: {
    padding: 8
  },
  topBox: {
    backgroundColor: '#2c3e50',
    margin: -8,
    marginBottom: -32,
    paddingTop: 24,
    paddingBottom: 48
  },
  walletCard: {
    padding: 16,
    flexDirection: 'row'
  },
  walletImage: {
    height: 80,
    width: 80,
    marginRight: 32
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)'
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
      this.props.getExpenses.isReceived &&
      this.props.getIncomes.isReceived &&
      this.props.getSavings.isReceived
    ) {
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
          <View style={styles.walletCard}>
            <Image style={styles.walletImage} source={WalletImage} />
            <View>
              <LH1Text style={{ fontSize: 40 }}>{`${currencyCode} ${
                this.state.totalWalletAmount
              }`}</LH1Text>
              <LPText>Amount in Wallet.</LPText>
            </View>
          </View>
        </View>

        <View>
          <Card>
            <ImageBackground
              style={{
                width: '100%',
                backgroundColor: '#fff'
              }}
              source={IncomeBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>{`${currencyCode} ${this.state.totalIncomesAmount}`}</LH1Text>
                  <LPText>Incomes</LPText>
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
                backgroundColor: '#fff'
              }}
              source={ExpenseBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>{`${currencyCode} ${this.state.totalExpensesAmount}`}</LH1Text>
                  <LPText>Expenses</LPText>
                </View>
              </View>
            </ImageBackground>
          </Card>

          <Card>
            <ImageBackground
              style={{
                width: '100%',
                backgroundColor: '#fff'
              }}
              source={SavingBg}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>{`${currencyCode} ${this.state.totalSavingsAmount}`}</LH1Text>
                  <LPText>Savings</LPText>
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
