import React, { Component } from 'react';
import moment from 'moment';
import { View, StyleSheet, Image, FlatList, Keyboard } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

import { PText, H2Text } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';
import IncomingImage from '../../assets/images/income.png';

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
        backgroundColor: '#FFF3E0',
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
        fontWeight: '500',
        fontFamily: 'lato-regular',
        fontSize: 20,
    },
    incomeList: {
        paddingHorizontal: 8,
        marginHorizontal: -8,
        padding: 0,
    },
    incomePrice: {
        marginRight: 16,
        fontSize: 16,
        fontFamily: 'lato-regular'
    }
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

    componentDidMount = () => {
        if (this.props.getIncomes.isReceived && this.props.getIncomes.data !== null) {
            this.updateTotalAmount(this.props.getIncomes.data);
        }
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
    }

    onUpdateIncome = () => {
        const { incomeAmountUpdate, incomeFromUpdate } = this.state;
        const id = this.state.currentId;
        const query = { incomeAmount: incomeAmountUpdate, incomeFrom: incomeFromUpdate, id };
        this.props.dispatch(updateIncomeReq(query));
        this.setState({
            incomeAmount: null,
            incomeFrom: null
        });
        this.closeModal('updateModal');
    }

    onRemoveIncome = () => {
        const id = this.state.currentId;
        const query = { id };
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

    openUpdateModal(inco) {
        this.setState({
            updateModal: true,
            currentId: inco.id,
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
        const { currencyCode } = this.props.getSettings.data;
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
                            <PText style={styles.incomeTotal}>{`${currencyCode} ${totalAmount}`}</PText>
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
                                            primaryText: item.incomeFrom,
                                            secondaryText: `${moment(item.createdAt).calendar()} · ${moment(item.createdAt).format('D MMMM, YYYY')}`
                                        }}
                                        rightElement={<H2Text style={styles.incomePrice}>{`${currencyCode} ${item.incomeAmount}`}</H2Text>}
                                        onPress={() => this.openUpdateModal(item)}
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
    getSettings: state.getSettings
}))(IncomeScreen);
