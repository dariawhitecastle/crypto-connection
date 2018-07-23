import React from 'react';
import Table from '../Components/Table.component.jsx';
import { isEqual } from 'lodash';
import { getIntervalPrices, closeSocket2 } from '../api';

class Prices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: []
    };
  }

  componentWillMount() {
    getIntervalPrices((err, data) => {
      this.setState({ priceData: data });
    });
  }
  shouldComponentUpdate(prevProps, prevState) {
    return !isEqual(this.state.priceData, prevState.priceData);
  }
  componentWillUnmount() {
    closeSocket2();
  }

  render() {
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

export default Prices;
