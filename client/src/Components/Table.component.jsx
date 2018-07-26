import React from 'react';
import { map, get, each, filter, find, min, max } from 'lodash';
import classnames from 'classnames';

const Thead = ({ data }) => {
  // console.log(data);
  return (
    <thead className="tableHead">
      <tr>{data.map(coin => <th key={coin.name}>{coin.name}</th>)}</tr>
    </thead>
  );
};
const Trows = ({ data }) => {
  return (
    <tr className="dataRow">
      {data.map(coin => {
        return (
          <td key={coin.id}>{`${coin.quotes.BTC.price.toFixed(8)} BTC`}</td>
        );
      })}
    </tr>
  );
};

const MultiTrows = ({ data, coinMinMax, state, timestamp }) => {
  return (
    <tr className="dataRow">
      {data.map(coin => {
        return (
          <td
            className={classnames(
              {
                highestVal: state
                  ? state[`highest${coin.name}`] === timestamp
                  : false
              },
              {
                lowestVal: state
                  ? state[`lowest${coin.name}`] === timestamp
                  : false
              }
            )}
            key={coin.id}
          >{`${coin.quotes.BTC.price.toFixed(8)} BTC`}</td>
        );
      })}
    </tr>
  );
};
const findPrices = arr => {
  let allPrices = {
    Dogecoin: [],
    Litecoin: [],
    Monero: []
  };

  map(arr, item => {
    each(Object.values(item)[0], coin => {
      return allPrices[coin.name]
        ? (allPrices[coin.name] = [
            ...allPrices[coin.name],
            coin.quotes.BTC.price.toFixed(8)
          ])
        : null;
    });
  });

  const coinMinMax = {
    Dogecoin: allPrices.Dogecoin.sort(sortPrices),
    Litecoin: allPrices.Litecoin.sort(sortPrices),
    Monero: allPrices.Monero.sort(sortPrices)
  };
  return coinMinMax;
};

const sortPrices = (a, b) => a - b;

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.multiRow = Object.keys(this.props.data[0]).length === 1;
  }

  componentWillMount() {
    if (this.multiRow) {
      const coinMinMax = findPrices(this.props.data);
      this.setState({
        coinMinMax
      });
    }
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data && this.multiRow) {
      const coinMinMax = findPrices(this.props.data);
      this.setState({
        coinMinMax
      });

      this.props.data.map((item, i, array) => {
        this.setState({
          timestamp: Object.keys(item)[0]
        });
        Object.values(item)[0].map(coin => {
          // if current coin price matches lowest price for that coins we set the state to the current coin timestamp
          if (min(coinMinMax[coin.name]) === coin.quotes.BTC.price.toFixed(8)) {
            this.setState({
              [`lowest${coin.name}`]: Object.keys(item)[0]
            });
          }
          // if current coin price matches highest price for that coins we set the state to the current coin timestamp
          if (max(coinMinMax[coin.name]) === coin.quotes.BTC.price.toFixed(8)) {
            this.setState({
              [`highest${coin.name}`]: this.state.timestamp
            });
          }
          return this.state;
        });
      });
    }
  }

  render() {
    const { data } = this.props;
    const { coinMinMax, ...rest } = this.state;

    let tHeadData = [];
    this.multiRow
      ? (tHeadData = Object.values(data[0])[0])
      : (tHeadData = data);

    return (
      <table>
        <Thead data={tHeadData} />
        <tbody>
          {this.multiRow ? (
            data.map(timestamp => {
              return (
                <MultiTrows
                  key={Object.keys(timestamp)[0]}
                  timestamp={Object.keys(timestamp)[0]}
                  data={Object.values(timestamp)[0]}
                  coinMinMax={coinMinMax}
                  state={{ ...rest }}
                />
              );
            })
          ) : (
            <Trows key={data.id} data={data} />
          )}
        </tbody>
      </table>
    );
  }
}

export default Table;
