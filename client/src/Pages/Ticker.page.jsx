import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/coins.actions.js';
import Table from '../Components/Table.component.jsx';
import { isEqual } from 'lodash';
import { getTickerPrices, closeSocket1 } from '../api';

class Ticker extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.tickerData, nextProps.tickerData);
  }

  componentWillMount() {
    this.props.actions.fetchCoinsData();
  }
  componentWillUnmount() {
    closeSocket1();
  }
  render() {
    if (!this.props.tickerData.length) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
          <section>
            <p className="section-header">Most up-to-date coin prices</p>
            <Table data={this.props.tickerData} />
          </section>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    tickerData: state.coinReducer.tickerPrices
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticker);
