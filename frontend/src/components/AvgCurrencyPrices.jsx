import React, { useState, useEffect } from 'react';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import '../style.css';
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
      <Table className="currencyPrice">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Sell</Th>
            <Th>Buy</Th>
          </Tr>
        </Thead>
        <Tbody>
          {avgPriceList.map(item => (
            <Tr key={item._id}>
              <Td>
                {`${currencyPairNames[item.currencyPair]} ${
                  currencyFlags[item.currencyPair.split('-')[0]]
                } / ${currencyFlags[item.currencyPair.split('-')[1]]}`}
              </Td>
              <Td>{item.price.sellPrice}</Td>
              <Td>{item.price.buyPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
