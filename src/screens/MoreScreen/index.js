import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-material-ui';

import { PText } from '../../components/Text';
import { TextField } from '../../components/Input';
import { PrimaryButton } from '../../components/Button';
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

  // Change field helper
  onChangeField = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  closeModal(name) {
    this.setState({
      [name]: false
    });
  }

  changeCurrencyCode = () => {
    const query = {
      currencyCode: this.state.currencyCode
    };
    this.props.dispatch(updateSettingReq(query));
    this.setState({
      currencyModal: false
    });
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <ListItem
          style={{ contentViewContainer: styles.listItem }}
          divider
          dense
          centerElement={{
            primaryText: 'Theme',
            secondaryText: 'Choose the theme of your app.'
          }}
          rightElement={<PText>Light</PText>}
          onPress={() => {}}
        />
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
          rightElement={<PText>{this.state.currencyCode}</PText>}
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
          primaryAction={<PrimaryButton text="Change" onPress={this.changeCurrencyCode} />}
          secondaryAction={<View />}
        >
          <TextField
            name="currencyCode"
            label="Currency Code"
            value={this.state.currencyCode}
            onChangeText={value => this.onChangeField('currencyCode', value)}
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
