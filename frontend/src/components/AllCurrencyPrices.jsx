import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';
import NoCurrencyFound from './NoCurrencyFound';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import { FiEdit } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
export default function AllCurrencyPrices({ exchangeName, isAdmin }) {
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  const handleSaveUpdatedPrice = (currencyPairName, sellPrice, buyPrice) => {
    try {
      fetch(`/exchanges/${exchangeName}/${currencyPairName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sellPrice, buyPrice }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSelectedCurrencyPriceList(prevState => {
              const updatedCurrencyPriceList = prevState.map(currencyPair => {
                if (currencyPair.currencyPair === currencyPairName) {
                  return {
                    ...currencyPair,
                    price: { sellPrice, buyPrice },
                  };
                } else {
                  return currencyPair;
                }
              });
              return updatedCurrencyPriceList;
            });
          }
        })
        .catch(error => console.log(error));
    } catch (error) {}
  };

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
                  onSavePriceUpdate={handleSaveUpdatedPrice}
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

function CurrencyPriceTableRow({
  currencyPair,
  isLastRow,
  isAdmin,
  onSavePriceUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [sellPrice, setSellPrice] = useState(currencyPair.price.sellPrice);
  const [buyPrice, setBuyPrice] = useState(currencyPair.price.buyPrice);
  const getTdStyle = isLastRow => {
    return isLastRow ? style.lastTd : style.td;
  };

  const handleClickSave = () => {
    onSavePriceUpdate(currencyPair.currencyPair, sellPrice, buyPrice);
    setIsEditing(false);
  };

  let tdContent;
  if (isEditing) {
    tdContent = (
      <>
        <Td style={getTdStyle(isLastRow)}>
          <input
            type="text"
            value={sellPrice}
            onChange={e => setSellPrice(e.currentTarget.value)}
          />
        </Td>
        <Td style={getTdStyle(isLastRow)}>
          <input
            type="text"
            value={buyPrice}
            onChange={e => setBuyPrice(e.currentTarget.value)}
          />
        </Td>
        {isAdmin && (
          <Td style={getTdStyle(isLastRow)}>
            <IoMdCheckmark onClick={handleClickSave} />
            <IoMdClose
              onClick={() => {
                setSellPrice(currencyPair.price.sellPrice);
                setBuyPrice(currencyPair.price.buyPrice);
                setIsEditing(false);
              }}
            />
          </Td>
        )}
      </>
    );
  } else {
    tdContent = (
      <>
        <Td style={getTdStyle(isLastRow)}>{currencyPair.price.sellPrice}</Td>
        <Td style={getTdStyle(isLastRow)}>{currencyPair.price.buyPrice}</Td>
        {isAdmin && (
          <Td style={getTdStyle(isLastRow)}>
            <FiEdit onClick={() => setIsEditing(true)} />
          </Td>
        )}
      </>
    );
  }

  return (
    <Tr key={currencyPair._id}>
      <Td style={getTdStyle(isLastRow)}>
        {`${currencyPairNames[currencyPair.currencyPair]} 
        ${currencyFlags[currencyPair.currencyPair.split('-')[0]]} / 
      ${currencyFlags[currencyPair.currencyPair.split('-')[1]]}`}
      </Td>
      {tdContent}
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
