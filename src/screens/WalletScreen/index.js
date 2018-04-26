import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Card } from 'react-native-material-ui';

import { LPText, LH1Text, PText, H1Text } from '../../components/Text';
import WalletImage from '../../assets/images/wallet.png';

const styles = StyleSheet.create({
  wrapper: {
    padding: 8
  },
  topBox: {
    backgroundColor: '#2c3e50',
    margin: -8,
    marginBottom: -32,
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
  incomeCard: {
    backgroundColor: '#FFE0B2'
  },
  expenseCard: {
    backgroundColor: '#FFCDD2'
  },
  savingCard: {
    backgroundColor: '#BBDEFB'
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
          <Card style={{ container: styles.incomeCard }}>
            <ImageBackground
              style={{
                width: '100%'
              }}
              source={{
                uri:
                  'https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg?dl&fit=crop&crop=entropy&w=640&h=426'
              }}
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
          <Card style={{ container: styles.expenseCard }}>
            <ImageBackground
              style={{
                width: '100%'
              }}
              source={{
                uri:
                  'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?dl&fit=crop&crop=entropy&w=640&h=426'
              }}
            >
              <View style={[styles.walletCard, styles.overlay]}>
                <View>
                  <LH1Text>{`${currencyCode} ${this.state.totalExpensesAmount}`}</LH1Text>
                  <LPText>Expenses</LPText>
                </View>
              </View>
            </ImageBackground>
          </Card>

          <Card style={{ container: styles.savingCard }}>
            <ImageBackground
              style={{
                width: '100%'
              }}
              source={{
                uri:
                  'https://images.pexels.com/photos/221534/pexels-photo-221534.jpeg?dl&fit=crop&crop=entropy&w=640&h=544'
              }}
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
