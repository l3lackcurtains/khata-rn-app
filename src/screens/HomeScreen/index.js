import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

import { translateText } from '../../utils/helper';
import AppBar from '../../components/AppBar';
import WalletScreen from '../WalletScreen';
import ExpenseScreen from '../ExpenseScreen';
import IncomeScreen from '../IncomeScreen';
import SavingScreen from '../SavingScreen';
import MoreScreen from '../MoreScreen';
import { getExpensesReq } from '../../redux/actions/expenseAc';
import { getIncomesReq } from '../../redux/actions/incomeAc';
import { getSavingsReq } from '../../redux/actions/savingAc';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 48,
    backgroundColor: '#FAFAFA'
  },
  BottomNavigation: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    active: 'wallet'
  };

  componentDidMount = async () => {
    const query = {};
    this.props.dispatch(getExpensesReq(query));
    this.props.dispatch(getIncomesReq(query));
    this.props.dispatch(getSavingsReq(query));
  };

  render() {
    const { getExpenses, getIncomes, getSavings, getSettings } = this.props;
    const lan = getSettings.data.language;

    // Changing Moment Language
    if (lan === 'Nepali') {
      /* eslint-disable */
      require('moment/locale/ne');
      moment.locale('ne');
      /* eslint-enable */
    } else {
      moment.locale('en');
    }
    return (
      <View style={styles.main}>
        <AppBar />
        {this.state.active === 'wallet' ? (
          <WalletScreen getExpenses={getExpenses} getIncomes={getIncomes} getSavings={getSavings} />
        ) : this.state.active === 'expense' ? (
          <ExpenseScreen getExpenses={getExpenses} />
        ) : this.state.active === 'income' ? (
          <IncomeScreen getIncomes={getIncomes} />
        ) : this.state.active === 'saving' ? (
          <SavingScreen getSavings={getSavings} />
        ) : this.state.active === 'more' ? (
          <MoreScreen />
        ) : null}
        <BottomNavigation
          active={this.state.active}
          hidden={false}
          style={{
            container: styles.BottomNavigation
          }}
        >
          <BottomNavigation.Action
            key="wallet"
            icon={<Feather name="pocket" size={22} />}
            label={translateText(lan, 'wallet', 'Wallet')}
            onPress={() => this.setState({ active: 'wallet' })}
          />
          <BottomNavigation.Action
            key="income"
            icon={<Feather name="plus-circle" size={22} />}
            label={translateText(lan, 'income', 'Income')}
            onPress={() => this.setState({ active: 'income' })}
          />
          <BottomNavigation.Action
            key="expense"
            icon={<Feather name="minus-circle" size={22} />}
            label={translateText(lan, 'expense', 'Expense')}
            onPress={() => this.setState({ active: 'expense' })}
          />
          <BottomNavigation.Action
            key="saving"
            icon={<Feather name="layers" size={22} />}
            label={translateText(lan, 'saving', 'Saving')}
            onPress={() => this.setState({ active: 'saving' })}
          />
          <BottomNavigation.Action
            key="more"
            icon={<Feather name="more-horizontal" size={24} />}
            label={translateText(lan, 'more', 'more')}
            onPress={() => this.setState({ active: 'more' })}
          />
        </BottomNavigation>
      </View>
    );
  }
}

export default connect(state => ({
  getExpenses: state.getExpenses,
  getIncomes: state.getIncomes,
  getSavings: state.getSavings,
  getSettings: state.getSettings
}))(HomeScreen);
