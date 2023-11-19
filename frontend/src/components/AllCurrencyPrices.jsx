import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';
import NoCurrencyFound from './NoCurrencyFound';

export default function AllCurrencyPrices({ exchangeName }) {
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  useEffect(() => {
    fetch(`/exchanges/${exchangeName}/currency-pairs`)
      .then(res => res.json())
      .then(data => setSelectedCurrencyPriceList(data.data))
      .catch(error => console.log(error));
  }, [exchangeName]);

  return (
    <div>
      {selectedCurrencyPriceList ? (
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
              {selectedCurrencyPriceList.map(item => (
                <Tr key={item._id}>
                  <Td style={tdStyle}>{item.currencyPair}</Td>
                  <Td style={tdStyle}>{item.price.sellPrice}</Td>
                  <Td style={tdStyle}>{item.price.buyPrice}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        <NoCurrencyFound />
      )}
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
