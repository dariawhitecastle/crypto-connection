import React from 'react';
import { map, get, each, filter, find, min, max } from 'lodash';
import classnames from 'classnames';

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
    // item = {Tue Jul 24 2018 16:38:34 GMT-0600 (Mountain Daylight Time): Array(3)}
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

    this.state = {
      current: true
    };

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
        Object.values(item)[0].map(coin => {
          if (min(coinMinMax[coin.name]) === coin.quotes.BTC.price.toFixed(8)) {
            this.setState({
              [`lowest${coin.name}`]: Object.keys(item)[0]
            });
          } else if (
            max(coinMinMax[coin.name]) === coin.quotes.BTC.price.toFixed(8)
          ) {
            this.setState({
              [`highest${coin.name}`]: Object.keys(item)[0]
            });
          } else {
            return this.state;
          }
        });
      });
    }
  }

  render() {
    const { data } = this.props;
    const { coinMinMax, ...rest } = this.state;

    let rowData = [];
    this.multiRow
      ? data.map(item => (rowData = Object.values(item)[0]))
      : (rowData = data);

    return (
      <table>
        <Thead data={rowData} />
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
