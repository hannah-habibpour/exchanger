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
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Sell</Th>
                <Th>Buy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedCurrencyPriceList.map(item => (
                <Tr key={item._id}>
                  <Td>{item.currencyPair}</Td>
                  <Td>{item.price.sellPrice}</Td>
                  <Td>{item.price.buyPrice}</Td>
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
