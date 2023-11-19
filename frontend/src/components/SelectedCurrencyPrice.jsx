import React, { useState, useEffect } from 'react';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import { Select, Option } from './ui/Select';
import { Table, Thead, Tbody, Th, Tr, Td } from './ui/Table';

export default function SelectedCurrencyPrice() {
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyPairNames)[0]
  );
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  useEffect(() => {
    fetch(`/currency-pairs/${selectedCurrency}`)
      .then(res => res.json())
      .then(data => setSelectedCurrencyPriceList(data.data))
      .catch(error => console.log(error));
  }, [selectedCurrency]);

  const handleSelectCurrency = e => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div>
      <div>Select a Currency pair:</div>
      <div>
        <Select defaultValue={selectedCurrency} onChange={handleSelectCurrency}>
          {Object.entries(currencyPairNames).map(([key, value]) => (
            <Option key={key} value={key}>
              {`
              ${value} 
              ${currencyFlags[key.split('-')[0]]} / 
              ${currencyFlags[key.split('-')[1]]}`}
            </Option>
          ))}
        </Select>
        <Table style={tableStyle}>
          <Thead>
            <Tr>
              <Th style={thStyle}>Exchange</Th>
              <Th style={thStyle}>Sell</Th>
              <Th style={thStyle}>Buy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedCurrencyPriceList.map(item => (
              <Tr key={item._id}>
                <Td style={tdStyle}>{item.exchangeName}</Td>
                <Td style={tdStyle}>{item.price.sellPrice}</Td>
                <Td style={tdStyle}>{item.price.buyPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

const tableStyle = {
  'border-collapse': 'collapse',
};

const tdStyle = {
  border: '1px solid gray',
  'text-align': 'left',
};

const thStyle = {
  border: '1px solid gray',
  'text-align': 'left',
};
