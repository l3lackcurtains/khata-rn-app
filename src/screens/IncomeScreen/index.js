import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, Keyboard } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

import { PText } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';
import IncomingImage from '../../assets/images/incoming.png';

import {
    addIncomeReq,
    addIncomeReset,
    getIncomesReq,
    updateIncomeReq,
    updateIncomeReset,
    removeIncomeReq,
    removeIncomeReset
} from '../../redux/actions/incomeAc';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 8
    },
    incomeHeader: {
        flexDirection: 'column',
        backgroundColor: '#F5F2DC',
        marginHorizontal: -8,
        marginTop: -8,
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#e2e2e2'
    },
    incomeInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    incomeCard: {
        marginHorizontal: -8,
        marginTop: -8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    incomeAddForm: {
        flexDirection: 'row'
    },
    incomeAddFormField: {
        width: '50%',
        padding: 8
    },
    incomeImage: {
        height: 32,
        width: 32,
        marginRight: 16
    },
    incomeTotal: {
        fontWeight: '700',
        fontSize: 24,
    },
    incomeList: {
        paddingHorizontal: 8,
        marginHorizontal: -8,
        padding: 0,
    },
});

class IncomeScreen extends Component {
    state = {
        updateModal: false,
        incomeFrom: null,
        incomeAmount: null,
        incomeFromUpdate: null,
        incomeAmountUpdate: null,
        currentId: null,
        totalAmount: 0,
    }

    componentDidMount = async () => {
        const query = {};
        this.props.dispatch(getIncomesReq(query));
    }

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

        // update on changes
        this.updateTotalAmount(nextProps.getIncomes.data);
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
    }

    onUpdateIncome = () => {
        const { incomeAmountUpdate, incomeFromUpdate } = this.state;
        const index = this.state.currentId;
        const query = { incomeAmount: incomeAmountUpdate, incomeFrom: incomeFromUpdate, index };
        this.props.dispatch(updateIncomeReq(query));
        this.setState({
            incomeAmount: null,
            incomeFrom: null
        });
        this.closeModal('updateModal');
    }

    onRemoveIncome = () => {
        const index = this.state.currentId;
        const query = { index };
        this.props.dispatch(removeIncomeReq(query));
        this.setState({
            incomeAmount: null,
            incomeFrom: null
        });
        this.closeModal('updateModal');
    }

    // Change field helper
    onChangeField = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    // Modal helper
    openModal(name) {
        this.setState({ [name]: true });
    }

    openUpdateModal(inco, index) {
        this.setState({
            updateModal: true,
            currentId: index,
            incomeFromUpdate: inco.incomeFrom,
            incomeAmountUpdate: inco.incomeAmount,
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

    updateTotalAmount = (arr) => {
        const totalAmount = arr.reduce((acc, curr) => acc + parseInt(curr.incomeAmount, 10), 0);
        this.setState({ totalAmount });
    }

    render() {
        const incomes = this.props.getIncomes;
        const { totalAmount } = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.incomeHeader}>
                    <View style={styles.incomeAddForm}>
                        <TextField
                            style={styles.incomeAddFormField}
                            name="incomeFrom"
                            label="Income From"
                            value={this.state.incomeFrom}
                            onChangeText={value => this.onChangeField('incomeFrom', value)}
                        />
                        <TextField
                            style={styles.incomeAddFormField}
                            name="incomeAmount"
                            label="Amount"
                            keyboardType="phone-pad"
                            value={this.state.incomeAmount}
                            onChangeText={value => this.onChangeField('incomeAmount', value)}
                        />
                    </View>
                    <View style={styles.incomeCard}>
                        <View style={styles.incomeInfo}>
                            <Image style={styles.incomeImage} source={IncomingImage} />
                            <PText style={styles.incomeTotal}>Rs. {totalAmount}</PText>
                        </View>
                        <View>
                            <PrimaryButton
                                text="Add Income"
                                disabled={!this.state.incomeFrom || !this.state.incomeAmount}
                                onPress={this.onAddIncome}
                            />
                        </View>
                    </View>
                </View>
                {
                    incomes.Loading ? <PText>Loading</PText> :
                        <FlatList
                            style={styles.incomeList}
                            data={incomes.data}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => (
                                <Card>
                                    <ListItem
                                        divider
                                        centerElement={{
                                            primaryText: item.incomeFrom,
                                            secondaryText: `Rs. ${item.incomeAmount}`,
                                        }}
                                        onPress={() => this.openUpdateModal(item, index)}
                                    />
                                </Card>
                            )}
                        />
                }
                <ModalBox
                    visible={this.state.updateModal}
                    animationType="fade"
                    onRequestClose={() => this.closeModal('updateModal')}
                    transparent
                    title="Edit Income"
                    primaryAction={<PrimaryButton text="Update" onPress={this.onUpdateIncome} disabled={!this.state.incomeFromUpdate || !this.state.incomeAmountUpdate} />}
                    secondaryAction={<SecondaryButton text="Delete" style={{ text: { color: 'red' } }} onPress={this.onRemoveIncome} />}
                >
                    <TextField
                        name="incomeFromUpdate"
                        label="Income From"
                        value={this.state.incomeFromUpdate}
                        onChangeText={value => this.onChangeField('incomeFromUpdate', value)}
                    />
                    <TextField
                        name="incomeAmountUpdate"
                        label="Amount"
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
}))(IncomeScreen);
