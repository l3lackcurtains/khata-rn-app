import React, { Component } from "react";
import { View, StyleSheet, Image, FlatList, Keyboard } from "react-native";
import { ListItem, Card } from "react-native-material-ui";
import { connect } from "react-redux";

import { PText } from "../../components/Text";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { TextField } from "../../components/Input";
import ModalBox from "../../components/ModalBox";
import IncomingImage from "../../assets/images/expense.png";

import {






  addExpenseReq,
  addExpenseReset,
  getExpensesReq,
  updateExpenseReq,
  updateExpenseReset,
  removeExpenseReq,
  removeExpenseReset
} from "../../redux/actions/expenseAc";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8
  },
  expenseHeader: {
    flexDirection: "column",
    backgroundColor: "#FFEBEE",
    marginHorizontal: -8,
    marginTop: -8,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2"
  },
  expenseInfo: {
    flexDirection: "row",

    alignItems: "center"
  },
  expenseCard: {
    marginHorizontal: -8,
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  expenseAddForm: {
    flexDirection: "row"
  },
  expenseAddFormField: {
    width: "50%",
    padding: 8
  },
  expenseImage: {
    height: 32,
    width: 32,
    marginRight: 16
  },
  expenseTotal: {
    fontWeight: "700",
    fontSize: 24
  },
  expenseList: {
    paddingHorizontal: 8,
    marginHorizontal: -8,
    padding: 0
  }
});

class ExpenseScreen extends Component {
  state = {
    updateModal: false,
    expenseFrom: null,
    expenseAmount: null,
    expenseFromUpdate: null,
    expenseAmountUpdate: null,
    currentId: null,
    totalAmount: 0
  };

  componentDidMount = async () => {
    const query = {};
    this.props.dispatch(getExpensesReq(query));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.addExpense.isReceived) {
      this.props.dispatch(addExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }

    if (nextProps.updateExpense.isReceived) {
      this.props.dispatch(updateExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }

    if (nextProps.removeExpense.isReceived) {
      this.props.dispatch(removeExpenseReset());
      const query = {};
      this.props.dispatch(getExpensesReq(query));
    }
    if (nextProps.getExpenses.data !== null) {
      // update on changes
      this.updateTotalAmount(nextProps.getExpenses.data);
    }
  }

  onAddExpense = () => {
    const { expenseAmount, expenseFrom } = this.state;
    const query = { expenseAmount, expenseFrom };
    this.props.dispatch(addExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
    });
    Keyboard.dismiss();
  };

  onUpdateExpense = () => {
    const { expenseAmountUpdate, expenseFromUpdate } = this.state;
    const index = this.state.currentId;
    const query = {
      expenseAmount: expenseAmountUpdate,
      expenseFrom: expenseFromUpdate,
      index
    };
    this.props.dispatch(updateExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
    });
    this.closeModal("updateModal");
  };

  onRemoveExpense = () => {
    const index = this.state.currentId;
    const query = { index };
    this.props.dispatch(removeExpenseReq(query));
    this.setState({
      expenseAmount: null,
      expenseFrom: null
    });
    this.closeModal("updateModal");
  };

  // Change field helper
  onChangeField = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  // Modal helper
  openModal(name) {
    this.setState({ [name]: true });
  }

  openUpdateModal(exp, index) {
    this.setState({
      updateModal: true,
      currentId: index,
      expenseFromUpdate: exp.expenseFrom,
      expenseAmountUpdate: exp.expenseAmount
    });
  }

  closeModal(name) {
    this.setState({
      [name]: false,
      currentId: null,
      expenseAmount: null,
      expenseFrom: null
    });
  }

  updateTotalAmount = arr => {
    const totalAmount = arr.reduce(
      (acc, curr) => acc + parseInt(curr.expenseAmount, 10),
      0
    );
    this.setState({ totalAmount });
  };

  render() {
    const expenses = this.props.getExpenses;
    const { totalAmount } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseAddForm}>
            <TextField
              style={styles.expenseAddFormField}
              name="expenseFrom"
              label="Expense on"
              value={this.state.expenseFrom}
              onChangeText={value => this.onChangeField("expenseFrom", value)}
            />
            <TextField
              style={styles.expenseAddFormField}
              name="expenseAmount"
              label="Amount"
              keyboardType="phone-pad"
              value={this.state.expenseAmount}
              onChangeText={value => this.onChangeField("expenseAmount", value)}
            />
          </View>
          <View style={styles.expenseCard}>
            <View style={styles.expenseInfo}>
              <Image style={styles.expenseImage} source={IncomingImage} />
              <PText style={styles.expenseTotal}>Rs. {totalAmount}</PText>
            </View>
            <View>
              <PrimaryButton
                text="Add Expense"
                disabled={!this.state.expenseFrom || !this.state.expenseAmount}
                onPress={this.onAddExpense}
              />
            </View>
          </View>
        </View>
        {expenses.Loading ? (
          <PText>Loading</PText>
        ) : (
          <FlatList
            style={styles.expenseList}
            data={expenses.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <Card>
                <ListItem
                  divider
                  centerElement={{
                    primaryText: item.expenseFrom,
                    secondaryText: `Rs. ${item.expenseAmount}`
                  }}
                  onPress={() => this.openUpdateModal(item, index)}
                />
              </Card>
            )}
          />
        )}
        <ModalBox
          visible={this.state.updateModal}
          animationType="fade"
          onRequestClose={() => this.closeModal("updateModal")}
          transparent
          title="Edit Expense"
          primaryAction={
            <PrimaryButton
              text="Update"
              onPress={this.onUpdateExpense}
              disabled={
                !this.state.expenseFromUpdate || !this.state.expenseAmountUpdate
              }
            />
          }
          secondaryAction={
            <SecondaryButton
              text="Delete"
              style={{ text: { color: "red" } }}
              onPress={this.onRemoveExpense}
            />
          }
        >
          <TextField
            name="expenseFromUpdate"
            label="Expense From"
            value={this.state.expenseFromUpdate}
            onChangeText={value =>
              this.onChangeField("expenseFromUpdate", value)
            }
          />
          <TextField
            name="expenseAmountUpdate"
            label="Amount"
            keyboardType="phone-pad"
            value={this.state.expenseAmountUpdate}
            onChangeText={value =>
              this.onChangeField("expenseAmountUpdate", value)
            }
          />
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  addExpense: state.addExpense,
  getExpenses: state.getExpenses,
  removeExpense: state.removeExpense,
  updateExpense: state.updateExpense
}))(ExpenseScreen);
