import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-material-ui';

import { PText } from '../../components/Text';
import { TextField } from '../../components/Input';
import ModalBox from '../../components/ModalBox';

import {
  getSettingsReq,
  updateSettingReq,
  updateSettingReset
} from '../../redux/actions/settingAc';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 0
  },
  listItem: {
    paddingHorizontal: 16
  }
});

class MoreScreen extends Component {
  state = {
    currencyModal: false,
    currencyCode: ''
  };

  componentDidMount = () => {
    this.setState({
      currencyCode: this.props.getSettings.data.currencyCode
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.updateSetting.isReceived) {
      const query = {};
      this.props.dispatch(getSettingsReq(query));
      this.props.dispatch(updateSettingReset());
    }
  };

  closeModal(name) {
    this.setState({
      [name]: false
    });
  }

  changeCurrencyCode = value => {
    this.setState(
      {
        currencyCode: value
      },
      () => {
        const query = {
          currencyCode: this.state.currencyCode.trim()
        };
        this.props.dispatch(updateSettingReq(query));
      }
    );
  };

  render() {
    const { currencyCode } = this.state;
    return (
      <View style={styles.wrapper}>
        <ListItem
          style={{ contentViewContainer: styles.listItem }}
          divider
          dense
          centerElement={{
            primaryText: 'Language',
            secondaryText: 'Choose your prefered Language.'
          }}
          rightElement={<PText>English</PText>}
          onPress={() => {}}
        />
        <ListItem
          style={{ contentViewContainer: styles.listItem }}
          divider
          dense
          centerElement={{
            primaryText: 'Currency Symbol',
            secondaryText: 'Choose your prefered currency symbol.'
          }}
          rightElement={<PText>{currencyCode}</PText>}
          onPress={() => this.setState({ currencyModal: true })}
        />
        <ListItem
          style={{ contentViewContainer: styles.listItem }}
          divider
          dense
          centerElement={{
            primaryText: 'Export',
            secondaryText: 'Export your khata records.'
          }}
          onPress={() => {}}
        />
        <ListItem
          style={{ contentViewContainer: styles.listItem }}
          divider
          dense
          centerElement={{
            primaryText: 'Import',
            secondaryText: 'Import khata records.'
          }}
          onPress={() => {}}
        />

        <ModalBox
          visible={this.state.currencyModal}
          onRequestClose={() => this.closeModal('currencyModal')}
          transparent
          title="Change Currency"
        >
          <TextField
            name="currencyCode"
            label="Currency Code"
            value={this.state.currencyCode}
            onChangeText={value => this.changeCurrencyCode(value)}
          />
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  getSettings: state.getSettings,
  updateSetting: state.updateSetting
}))(MoreScreen);
