import React from 'react';
import Table from '../Components/Table.component.jsx';
import { isEqual } from 'lodash';
import { getTickerPrices, closeSocket1 } from '../api';

class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerData: []
    };
  }

  shouldComponentUpdate(prevProps, prevState) {
    return !isEqual(this.state.tickerData, prevState.tickerData);
  }

  componentWillMount() {
    getTickerPrices((err, data) => {
      this.setState({ tickerData: data });
    });
  }
  componentWillUnmount() {
    closeSocket1();
  }

  render() {
    if (!this.state.tickerData.length) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
          <section>
            <Table data={this.state.tickerData} />
          </section>
        </header>
      );
    }
  }
}

export default Ticker;
