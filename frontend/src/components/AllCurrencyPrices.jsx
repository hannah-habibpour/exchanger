import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';
import NoCurrencyFound from './NoCurrencyFound';
import { currencyPairNames, currencyFlags } from '../constants/currency';

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

  const getTdStyle = index => {
    return index === selectedCurrencyPriceList.length - 1
      ? style.lastTd
      : style.td;
  };

  return (
    <div>
      {selectedCurrencyPriceList ? (
        <div>
          <Table style={style.table}>
            <Thead>
              <Tr>
                <Th style={style.th}>Name</Th>
                <Th style={style.th}>Sell</Th>
                <Th style={style.th}>Buy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedCurrencyPriceList.map((item, index) => (
                <Tr key={item._id}>
                  <Td style={getTdStyle(index)}>
                    {`${currencyPairNames[item.currencyPair]} 
                    ${currencyFlags[item.currencyPair.split('-')[0]]} / 
                  ${currencyFlags[item.currencyPair.split('-')[1]]}`}
                  </Td>
                  <Td style={getTdStyle(index)}>{item.price.sellPrice}</Td>
                  <Td style={getTdStyle(index)}>{item.price.buyPrice}</Td>
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
};
