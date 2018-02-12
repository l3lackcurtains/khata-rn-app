import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { ListItem, Card } from 'react-native-material-ui'
import firebase from '../../utils/firebase'

import { PText } from '../../components/Text'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { TextField } from '../../components/Input'
import ModalBox from '../../components/ModalBox'
import IncomingImage from '../../assets/images/incoming.png'

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
]

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
})

class IncomeScreen extends Component {
    state = {
      updateModal: false,
      addModal: false,
      incomeFrom: null,
      incomeAmount: null
    }

    componentDidMount = () => {
      firebase.database().ref('income').once('value').then((snapshot) => {
        console.warn(snapshot.val())
      })
    }

    onAddIncome = () => {
      this.closeModal('addModal')
      const incomeFrom2 = this.state.incomeFrom
      const incomeAmount = parseFloat(this.state.incomeAmount)
      firebase.database().ref('income').push().set({
        incomeFrom2,
        incomeAmount
      })
      this.setState({
        incomeFrom: null,
        incomeAmount: null
      })
    }

    onUpdateIncome = () => {
      this.closeModal('updateModal')
    }

    // Change field helper
    onChangeField = (field, value) => {
      this.setState({
        [field]: value
      })
    }

    // Modal helper
    openModal(name) {
      this.setState({ [name]: true });
    }

    closeModal(name) {
      this.setState({ [name]: false });
    }

    render() {
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
                    data={ListData}
                    renderItem={({ item }) => (
                        <Card>
                            <ListItem
                                divider
                                centerElement={{
                                    primaryText: item.name,
                                    secondaryText: `Rs. ${item.amount}`,
                                }}
                                onPress={() => this.openModal('updateModal')}
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
                    secondaryAction={<SecondaryButton text="Delete" onPress={() => this.closeModal('updateModal')} />}
                >
                    <TextField label="Income From" />
                    <TextField label="Amount" keyboardType="phone-pad" />
                </ModalBox>
            </View>
      )
    }
}
export default IncomeScreen
