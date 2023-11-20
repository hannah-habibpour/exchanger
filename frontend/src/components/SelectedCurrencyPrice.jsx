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

  const getTdStyle = index => {
    return index === selectedCurrencyPriceList.length - 1
      ? lastTdStyle
      : tdStyle;
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
        Select a Currency pair:
      </div>
      <div>
        <Select
          defaultValue={selectedCurrency}
          onChange={handleSelectCurrency}
          style={{ marginTop: '10px', padding: '5px' }}
        >
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
            {selectedCurrencyPriceList.map((item, index) => (
              <Tr key={item._id}>
                <Td style={getTdStyle(index)}>{item.exchangeName}</Td>
                <Td style={getTdStyle(index)}>{item.price.sellPrice}</Td>
                <Td style={getTdStyle(index)}>{item.price.buyPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  marginBottom: '10px',
  marginTop: '10px',
  border: '1px solid gray',
  borderRadius: '10px',
  borderSpacing: '0',
  padding: '10px',
};

const thStyle = {
  borderBottom: '1px solid gray',
  textAlign: 'left',
};

const tdStyle = {
  textAlign: 'left',
  paddingTop: '10px',
  borderBottom: '1px solid #a9a9a9',
};

const lastTdStyle = {
  textAlign: 'left',
  paddingTop: '10px',
};
