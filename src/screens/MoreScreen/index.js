import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem, RadioButton } from 'react-native-material-ui';

import Translate from '../../utils/Translate';
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
    paddingHorizontal: 16,
    height: 65
  },
  languageButtonGroup: {
    height: 100
  },
  settingTitle: {
    fontSize: 16,
    paddingBottom: 4
  },
  settingMeta: {
    fontSize: 14,
    color: '#555'
  }
});

class MoreScreen extends Component {
  state = {
    currencyModal: false,
    currencyCode: '',
    languageModal: false,
    language: 'English'
  };

  componentDidMount = () => {
    this.setState({
      currencyCode: this.props.getSettings.data.currencyCode,
      language: this.props.getSettings.data.language
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

  changeLanguage = value => {
    this.setState(
      {
        language: value
      },
      () => {
        const query = {
          language: this.state.language
        };
        this.props.dispatch(updateSettingReq(query));
      }
    );
  };

  render() {
    const { currencyCode, language } = this.state;
    return (
      <View style={styles.wrapper}>
        <ListItem
          style={{
            container: styles.listItem
          }}
          divider
          dense
          centerElement={
            <View>
              <PText style={styles.settingTitle}>
                <Translate id="language">Language</Translate>
              </PText>
              <PText style={styles.settingMeta}>
                <Translate id="languageMeta">Choose your prefered Language.</Translate>
              </PText>
            </View>
          }
          rightElement={<PText>{language}</PText>}
          onPress={() => this.setState({ languageModal: true })}
        />
        <ListItem
          style={{ container: styles.listItem }}
          divider
          dense
          centerElement={
            <View>
              <PText style={styles.settingTitle}>
                <Translate id="currency">Currency Symbol</Translate>
              </PText>
              <PText style={styles.settingMeta}>
                <Translate id="currencyMeta">Choose your prefered currency symbol.</Translate>
              </PText>
            </View>
          }
          rightElement={<PText>{currencyCode}</PText>}
          onPress={() => this.setState({ currencyModal: true })}
        />
        <ListItem
          style={{ container: styles.listItem }}
          divider
          dense
          centerElement={
            <View>
              <PText style={styles.settingTitle}>
                <Translate id="export">Export</Translate>
              </PText>
              <PText style={styles.settingMeta}>
                <Translate id="exportMeta">Export your khata records.</Translate>
              </PText>
            </View>
          }
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

        <ModalBox
          visible={this.state.languageModal}
          onRequestClose={() => this.closeModal('languageModal')}
          transparent
          title="Change language"
        >
          <View style={styles.languageButtonGroup}>
            <RadioButton
              label="English"
              checked={this.state.language === 'English'}
              value="English"
              onSelect={checked => this.changeLanguage(checked)}
            />
            <RadioButton
              label="Nepali"
              checked={this.state.language === 'Nepali'}
              value="Nepali"
              onSelect={checked => this.changeLanguage(checked)}
            />
          </View>
        </ModalBox>
      </View>
    );
  }
}

export default connect(state => ({
  getSettings: state.getSettings,
  updateSetting: state.updateSetting
}))(MoreScreen);
