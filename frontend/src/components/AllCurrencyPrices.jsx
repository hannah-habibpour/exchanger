import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';
import NoCurrencyFound from './NoCurrencyFound';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import { FiEdit } from 'react-icons/fi';
export default function AllCurrencyPrices({ exchangeName, isAdmin }) {
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  useEffect(() => {
    fetch(`/exchanges/${exchangeName}/currency-pairs`)
      .then(res => res.json())
      .then(data => setSelectedCurrencyPriceList(data.data))
      .catch(error => console.log(error));
  }, [exchangeName]);

  const isLastRow = index => {
    return selectedCurrencyPriceList.length - 1 === index;
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
                {isAdmin && <Th style={style.th}></Th>}
              </Tr>
            </Thead>
            <Tbody>
              {selectedCurrencyPriceList.map((currencyPair, index) => (
                <CurrencyPriceTableRow
                  key={index}
                  currencyPair={currencyPair}
                  isLastRow={isLastRow(index)}
                  isAdmin={isAdmin}
                />
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

function CurrencyPriceTableRow({ currencyPair, isLastRow, isAdmin }) {
  const getTdStyle = isLastRow => {
    return isLastRow ? style.lastTd : style.td;
  };

  return (
    <Tr key={currencyPair._id}>
      <Td style={getTdStyle(isLastRow)}>
        {`${currencyPairNames[currencyPair.currencyPair]} 
        ${currencyFlags[currencyPair.currencyPair.split('-')[0]]} / 
      ${currencyFlags[currencyPair.currencyPair.split('-')[1]]}`}
      </Td>
      <Td style={getTdStyle(isLastRow)}>{currencyPair.price.sellPrice}</Td>
      <Td style={getTdStyle(isLastRow)}>{currencyPair.price.buyPrice}</Td>
      {isAdmin && (
        <Td style={getTdStyle(isLastRow)}>
          <FiEdit />
        </Td>
      )}
    </Tr>
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
