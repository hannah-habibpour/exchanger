import React, { useState, useEffect } from 'react';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';

export default function AvgCurrencyPrices() {
  const [avgPriceList, setAvgPriceList] = useState([]);

  useEffect(() => {
    fetch('/exchanges/avg/currencypairs')
      .then(res => res.json())
      .then(data => setAvgPriceList(data.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Table style={tableStyle}>
        <Thead>
          <Tr>
            <Th style={thStyle}>Name</Th>
            <Th style={thStyle}>Sell</Th>
            <Th style={thStyle}>Buy</Th>
          </Tr>
        </Thead>
        <Tbody>
          {avgPriceList.map(item => (
            <Tr key={item._id}>
              <Td style={tdStyle}>
                {`${currencyPairNames[item.currencyPair]} ${
                  currencyFlags[item.currencyPair.split('-')[0]]
                } / ${currencyFlags[item.currencyPair.split('-')[1]]}`}
              </Td>
              <Td style={tdStyle}>{item.price.sellPrice}</Td>
              <Td style={tdStyle}>{item.price.buyPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

const tableStyle = {
  'border-collapse': 'collapse',
  margin: '0 auto',
  width: '60%',
  'margin-bottom': '10px',
};

const tdStyle = {
  border: '1px solid gray',
  'text-align': 'left',
};

const thStyle = {
  border: '1px solid gray',
  'text-align': 'left',
};
