import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { PText } from '../../components/Text';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';
import IncomingImage from '../../assets/images/incoming.png';

const ListData = [
  {
    key: 1,
    name: 'Got last month salary.',
    amount: 4000,
  },
  {
    key: 2,
    name: 'Collected from clients.',
    amount: 3450,
  },
  {
    key: 3,
    name: 'Got from college.',
    amount: 1000,
  },
  {
    key: 4,
    name: 'Won a competition.',
    amount: 10000,
  },
  {
    key: 5,
    name: 'Got salary Bonus.',
    amount: 5000,
  },
  {
    key: 6,
    name: 'Collected from clients.',
    amount: 1450,
  },
  {
    key: 7,
    name: 'last month salary.',
    amount: 5000,
  },
  {
    key: 8,
    name: 'Got from bank.',
    amount: 12000,
  },
  {
    key: 9,
    name: 'Received from madan',
    amount: 2000,
  },
  {
    key: 10,
    name: 'Mom sent me',
    amount: 9000,
  },
  {
    key: 11,
    name: 'Dad sent me',
    amount: 9000,
  }
];

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

    componentDidMount = () => {
      //
    }

    onAddIncome = () => {
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
      if (isEmpty(income)) return <PText>Income List is empty</PText>;
      const incomes = [];
      Object.keys(income).map(key => incomes.push({
        key,
        ...income[key]
      }));
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
  }))
)(IncomeScreen);
