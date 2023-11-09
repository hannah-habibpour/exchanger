import React, { useState, useEffect } from 'react';
import '../style.css';
import { currencyPairs } from '../constants/currency';
function Home() {
  const [avgPriceList, setAvgPriceList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencyPairs[0].value
  );
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  useEffect(() => {
    fetch('/exchanges/avg/currencypairs')
      .then(res => res.json())
      .then(data => setAvgPriceList(data.data))
      .catch(error => console.log(error));
  }, []);

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
      <div>
        <table className="currencyPrice">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sell</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {avgPriceList.map(item => (
              <tr key={item._id}>
                <td>{item.currencyPair}</td>
                <td>{item.price.sellPrice}</td>
                <td>{item.price.buyPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div>Select a Currency pair:</div>
        <div>
          <select
            name=""
            defaultValue={selectedCurrency}
            onChange={handleSelectCurrency}
          >
            {currencyPairs.map(currencyPair => (
              <option key={currencyPair.value} value={currencyPair.value}>
                {currencyPair.name}
              </option>
            ))}
          </select>
          <table>
            <thead>
              <tr>
                <th>Exchange</th>
                <th>Sell</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {selectedCurrencyPriceList.map(item => (
                <tr key={item._id}>
                  <td>{item.exchangeName}</td>
                  <td>{item.price.sellPrice}</td>
                  <td>{item.price.buyPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
