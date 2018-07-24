import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/coins.actions.js';
import Table from '../Components/Table.component.jsx';
import { isEqual } from 'lodash';

class Prices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: [{ tickerData: this.props.tickerData }]
    };
  }

  componentDidlMount() {
    this.props.actions.fetchLatestData();
    this.getLatestData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return (
    //   !isEqual(this.state.priceData, nextState.priceData) ||
    //   !isEqual(this.props.tickerData, nextProps.tickerData)
    // );
    return true;
  }

  getLatestData = () => {
    let timestamp = new Date().getMinutes();
    let updatedPrices = [];

    if (this.state.priceData.length >= 30) {
      this.setState({
        priceData: [
          ...this.state.priceData.slice(0, 29),
          { [timestamp]: this.props.latestSetOfPrices }
        ]
      });
    } else {
      this.setState({
        priceData: [
          ...this.state.priceData,
          { [timestamp]: this.props.latestSetOfPrices }
        ]
      });
    }
  };

  render() {
    // tslint:disable-next-line:no-console
    console.log('updating', this.state.priceData);
    if (!this.state.priceData.length) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
          <section>
            <Table data={this.state.priceData} />
          </section>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    latestSetOfPrices: state.coinReducer.latestSetOfPrices,
    tickerData: state.coinReducer.recentPrices
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
