import React, { Component } from 'react';
import { connect } from 'react-redux';
import languages from './languages';
import { transformNumberToNepali } from './helper';

class Translate extends Component {
  state = {
    //
  };
  render() {
    if (!this.props.getSettings.isReceived) return null;
    const { language } = this.props.getSettings.data;
    const { id } = this.props;
    if (language === 'Nepali') {
      const { np } = languages;
      if (id === 'number') {
        const nepaliNumber = transformNumberToNepali(this.props.children);
        return <React.Fragment>{nepaliNumber}</React.Fragment>;
      } else if (!np[id]) {
        return <React.Fragment>{this.props.children}</React.Fragment>;
      }

      return <React.Fragment>{np[id]}</React.Fragment>;
    }
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const mapStateToProps = state => ({ getSettings: state.getSettings });

export default connect(mapStateToProps)(Translate);
