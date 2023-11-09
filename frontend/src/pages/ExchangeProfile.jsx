const ExchangeProfile = () => {
  return (
    <div>
      <div>
        <div>
          <p>Bahmani</p>
          <img src="" alt="" />
        </div>
        <div>
          <p>Address: Toronto</p>
          <p>Number: +1(833)-333-3333</p>
          <p>Email: Bahmani@gmail.com</p>
        </div>
      </div>
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Sell</th>
            <th>Buy</th>
          </tr>
          <tr>
            <td>USD-CAD</td>
            <td>1.33</td>
            <td>1.32</td>
          </tr>
          <tr>
            <td>USD-IRR</td>
            <td>52.000</td>
            <td>50.000</td>
          </tr>
          <tr>
            <td>CAD-IRR</td>
            <td>38.000</td>
            <td>36.000</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ExchangeProfile;
