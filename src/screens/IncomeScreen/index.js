import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, NetInfo, AsyncStorage } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { PText } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';
import IncomingImage from '../../assets/images/incoming.png';

import { addIncomeReq, addIncomeReset } from '../../redux/actions/incomeAc';

const styles = StyleSheet.create({
    wrapper: {
        padding: 8,
        flex: 1,
    },
    incomeCard: {
        marginHorizontal: -8,
        marginTop: -8,
        backgroundColor: '#333',
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    incomeHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    incomeImage: {
        height: 32,
        width: 32,
        marginRight: 16
    },
    incomeTotal: {
        color: '#f3f3f3',
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
        addModal: false,
        incomeFrom: null,
        incomeAmount: null,
        currentId: null,
    }

    componentDidMount = async () => {
        console.warn('teah');
        try {
            const value = await AsyncStorage.getItem('persist:firebase');
            console.warn(value);
        } catch (error) {
            console.warn('Sorry!!');
        }
    }

    onAddIncome = () => {
        /*
        const { incomeFrom, incomeAmount } = this.state;
        const query = {
            incomeFrom,
            incomeAmount
        };

        this.props.dispatch(addIncomeReq(query));
        */
        NetInfo.isConnected.fetch().then((isConnected) => {
            console.warn(`First, is ${isConnected ? 'online' : 'offline'}`);
        });
        const { firebase } = this.props;
        this.closeModal('addModal');
        const { incomeFrom, incomeAmount } = this.state;
        const income = {
            incomeFrom,
            incomeAmount
        };
        firebase.push('income', income);
        this.setState({
            incomeAmount: null,
            incomeFrom: null
        });
    }

    onUpdateIncome = () => {
        const { firebase } = this.props;
        const id = this.state.currentId;
        const { incomeFrom, incomeAmount } = this.state;
        const income = {
            incomeFrom,
            incomeAmount
        };
        firebase.set(`/income/${id}`, income);
        this.closeModal('updateModal');
    }

    onRemoveIncome = () => {
        const { firebase } = this.props;
        const id = this.state.currentId;
        firebase.remove(`/income/${id}`);
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
            currentId: inco.key,
            incomeFrom: inco.incomeFrom,
            incomeAmount: inco.incomeAmount,
        });
    }

    closeModal(name) {
        setTimeout(() => {
            this.setState({
                [name]: false,
                currentId: null,
                incomeAmount: null,
                incomeFrom: null
            });
        }, 500);
    }

    render() {
        const { income } = this.props;
        if (!isLoaded(income)) return <PText>Loading</PText>;
        const incomes = [];
        if (!isEmpty(income)) {
            Object.keys(income).map(key => incomes.push({
                key,
                ...income[key]
            }));
        }

        return (
            <View style={styles.wrapper}>
                <View style={styles.incomeCard}>
                    <View style={styles.incomeHeader}>
                        <Image style={styles.incomeImage} source={IncomingImage} />
                        <PText style={styles.incomeTotal}>Rs. 45344</PText>
                    </View>
                    <View>
                        <PrimaryButton
                            text="add income"
                            onPress={() => this.openModal('addModal')}
                        />
                    </View>
                </View>
                {
                    isEmpty(income) ? <PText>Income List is empty</PText> :
                        <FlatList
                            style={styles.incomeList}
                            data={incomes}
                            renderItem={({ item }) => (
                                <Card>
                                    <ListItem
                                        divider
                                        centerElement={{
                                            primaryText: item.incomeFrom,
                                            secondaryText: `Rs. ${item.incomeAmount}`,
                                        }}
                                        onPress={() => this.openUpdateModal(item)}
                                    />
                                </Card>
                            )}
                        />
                }
                <ModalBox
                    visible={this.state.addModal}
                    animationType="fade"
                    onRequestClose={() => this.closeModal('addModal')}
                    transparent
                    title="Add Income"
                    primaryAction={<PrimaryButton text="Add" onPress={this.onAddIncome} />}
                >
                    <TextField
                        name="incomeFrom"
                        label="Income From"
                        value={this.state.incomeFrom}
                        onChangeText={value => this.onChangeField('incomeFrom', value)}
                    />
                    <TextField
                        name="incomeAmount"
                        label="Amount"
                        keyboardType="phone-pad"
                        value={this.state.incomeAmount}
                        onChangeText={value => this.onChangeField('incomeAmount', value)}
                    />
                </ModalBox>

                <ModalBox
                    visible={this.state.updateModal}
                    animationType="fade"
                    onRequestClose={() => this.closeModal('updateModal')}
                    transparent
                    title="Edit Income"
                    primaryAction={<PrimaryButton text="Update" onPress={this.onUpdateIncome} />}
                    secondaryAction={<SecondaryButton text="Delete" onPress={this.onRemoveIncome} />}
                >
                    <TextField
                        name="incomeFrom"
                        label="Income From"
                        value={this.state.incomeFrom}
                        onChangeText={value => this.onChangeField('incomeFrom', value)}
                    />
                    <TextField
                        name="incomeAmount"
                        label="Amount"
                        keyboardType="phone-pad"
                        value={this.state.incomeAmount}
                        onChangeText={value => this.onChangeField('incomeAmount', value)}
                    />
                </ModalBox>
            </View>
        );
    }
}
export default compose(
    firebaseConnect([
        'income'
    ]),
    connect(state => ({
        income: state.firebase.data.income,
        addIncome: state.addIncome,
        getIncomes: state.getIncomes
    }))
)(IncomeScreen);
