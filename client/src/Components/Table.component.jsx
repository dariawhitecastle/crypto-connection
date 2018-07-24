import React from 'react';

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
        <td key={coin.name}>{`${coin.quotes.BTC.price.toFixed(8)} BTC`}</td>
      ))}
    </tr>
  );
};

const Table = ({ data }) => {
  // tslint:disable-next-line:no-console
  console.log(data);
  let priceData = [];
  const multiRow = Object.keys(data[0]).length === 1;

  Object.keys(data[0]).length === 1
    ? data.map(item => (priceData = Object.values(item)[0]))
    : (priceData = data);

  return (
    <table>
      <Thead data={priceData} />
      <tbody>
        {multiRow ? (
          data.map(item => <Trows key={Object.keys(item)} data={priceData} />)
        ) : (
          <Trows key={priceData.name} data={priceData} />
        )}
      </tbody>
    </table>
  );
};

export default Table;
