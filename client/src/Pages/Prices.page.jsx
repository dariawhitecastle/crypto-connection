import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/coins.actions.js';
import Table from '../Components/Table.component.jsx';
import { isEqual } from 'lodash';
import { closeSocket2 } from '../api';

class Prices extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.fetchLatestData();
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.latestPrices.length !== nextProps.latestPrices.length;
  // }

  componentWillUnmount() {
    closeSocket2();
  }

  render() {
    const timestamp = new Date().toLocaleString();

    const data = !this.props.latestPrices.length
      ? { timestamp: this.props.tickerData }
      : this.props.latestPrices;

    if (!data.length) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
          <section className="section-header">
            <p>
              Prices for the last 30 minutes. Please allow a few minutes for
              prices to show up.{' '}
            </p>
            <p className="lowestVal">Lowest Price</p>
            <p className="highestVal">Highest price</p>
            <Table data={data} />
          </section>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    latestPrices: state.coinReducer.latestPrices,
    tickerData: state.coinReducer.tickerPrices
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
