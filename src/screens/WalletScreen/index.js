import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-material-ui';

import { PText, H1Text } from '../../components/Text';
import WalletImage from '../../assets/images/wallet.png';

import { getExpensesReq } from '../../redux/actions/expenseAc';
import { getIncomesReq } from '../../redux/actions/incomeAc';
import { getSavingsReq } from '../../redux/actions/savingAc';


const styles = StyleSheet.create({
    wrapper: {
        padding: 8,
    },
    twoBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    }
});

class WalletScreen extends Component {
    state = {
        totalIncomesAmount: 0,
        totalSavingsAmount: 0,
        totalExpensesAmount: 0,
        totalWalletAmount: 0
    }

    componentDidMount = async () => {
        const query = {};
        this.props.dispatch(getExpensesReq(query));
        this.props.dispatch(getIncomesReq(query));
        this.props.dispatch(getSavingsReq(query));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getExpenses.isReceived && nextProps.getIncomes.isReceived && nextProps.getSavings.isReceived) {
            if (nextProps.getExpenses.data !== null && nextProps.getIncomes.data !== null && nextProps.getSavings.data !== null) {
                // update on changes
                this.updateWalletAmount(nextProps.getIncomes.data, nextProps.getExpenses.data, nextProps.getSavings.data);
            }
        }
    }

    updateWalletAmount = (incomes, expenses, savings) => {
        const totalIncomesAmount = incomes.reduce((acc, curr) =>
            acc + parseInt(curr.incomeAmount, 10), 0);

        const totalSavingsAmount = savings.reduce((acc, curr) =>
            acc + parseInt(curr.savingAmount, 10), 0);

        const totalExpensesAmount = expenses.reduce((acc, curr) =>
            acc + parseInt(curr.expenseAmount, 10), 0);

        this.setState({
            totalIncomesAmount,
            totalSavingsAmount,
            totalExpensesAmount,
            totalWalletAmount: totalIncomesAmount - totalExpensesAmount - totalSavingsAmount,
        });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.oneBox}>
                    <Card>
                        <View style={styles.walletCard}>
                            <Image style={styles.walletImage} source={WalletImage} />
                            <View>
                                <PText>You have</PText>
                                <H1Text>Rs. {this.state.totalWalletAmount}</H1Text>
                                <PText>in your wallet.</PText>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={styles.oneBox}>
                    <Card style={{ container: styles.incomeCard }}>
                        <View style={styles.walletCard}>
                            <View>
                                <H1Text>Rs. {this.state.totalIncomesAmount}</H1Text>
                                <PText>Incomes</PText>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={styles.twoBox}>
                    <Card style={{ container: styles.expenseCard }}>
                        <View style={styles.walletCard}>
                            <View>
                                <H1Text>Rs. {this.state.totalExpensesAmount}</H1Text>
                                <PText>Expenses</PText>
                            </View>
                        </View>
                    </Card>

                    <Card style={{ container: styles.savingCard }}>
                        <View style={styles.walletCard}>
                            <View>
                                <H1Text>Rs. {this.state.totalSavingsAmount}</H1Text>
                                <PText>Savings</PText>
                            </View>
                        </View>
                    </Card>
                </View>
            </View>
        );
    }
}

export default connect(state => ({
    getExpenses: state.getExpenses,
    getIncomes: state.getIncomes,
    getSavings: state.getSavings
}))(WalletScreen);
