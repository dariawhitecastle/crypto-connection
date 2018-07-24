import React from 'react';
import { map, flatten, assign, merge } from 'lodash';

const Thead = ({ data }) => {
  return (
    <thead className="tableHead">
      <tr>{data.map(coin => <th key={coin.name}>{coin.name}</th>)}</tr>
    </thead>
  );
};

const Trows = ({ data }) => {
  return (
    <tr className="dataRow">
      {data.map(coin => (
        <td key={coin.id}>{`${coin.quotes.BTC.price.toFixed(8)} BTC`}</td>
      ))}
    </tr>
  );
};

const findPrices = arr => {
  const arrayOfPrices = map(arr, item =>
    map(Object.values(item)[0], coin => {
      return [coin.name, coin.quotes.BTC.price.toFixed(8)];
    })
  );
  return flatten(arrayOfPrices);
};

const objectify = arr => {
  return arr.reduce(function(prev, curr) {
    prev[curr[0]] = curr[1];
    return prev;
  }, {});
};

class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.multiRow = Object.keys(this.props.data[0]).length === 1;
  }

  componentWillMount() {
    if (this.multiRow) {
      const prices = objectify(findPrices(this.props.data));
      this.setState({
        prices
      });
    }
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      const getNewPrices = objectify(findPrices(this.props.data));
      const newPrices = merge(newPrices, this.state.prices);
      this.setState({
        prices: newPrices
      });
    }
  }

  render() {
    // tslint:disable-next-line:no-console
    console.log(this.state);
    const { data } = this.props;
    let priceData = [];

    this.multiRow
      ? data.map(item => (priceData = Object.values(item)[0]))
      : (priceData = data);

    return (
      <table>
        <Thead data={priceData} />
        <tbody>
          {this.multiRow ? (
            data.map(item => <Trows key={Object.keys(item)} data={priceData} />)
          ) : (
            <Trows key={priceData.id} data={priceData} />
          )}
        </tbody>
      </table>
    );
  }
}

export default Table;
