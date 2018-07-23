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
  return (
    <table>
      <Thead data={data} />
      <tbody>
        <Trows data={data} />
      </tbody>
    </table>
  );
};

export default Table;
