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
      ? style.lastTd
      : style.td;
  };

  return (
    <div>
      <div className="selectTitleContainer" style={style.selectTitleContainer}>
        Select a Currency pair:
      </div>
      <div>
        <Select
          defaultValue={selectedCurrency}
          onChange={handleSelectCurrency}
          style={style.select}
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
        <Table style={style.table}>
          <Thead>
            <Tr>
              <Th style={style.th}>Exchange</Th>
              <Th style={style.th}>Sell</Th>
              <Th style={style.th}>Buy</Th>
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

const style = {
  table: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '10px',
    border: '1px solid gray',
    borderRadius: '10px',
    borderSpacing: '0',
    padding: '10px',
  },
  th: { borderBottom: '1px solid gray', textAlign: 'left' },
  td: {
    textAlign: 'left',
    paddingTop: '10px',
    borderBottom: '1px solid #a9a9a9',
  },
  lastTd: { textAlign: 'left', paddingTop: '10px' },
  selectTitleContainer: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '20px',
  },
  select: { marginTop: '10px', padding: '5px' },
};
