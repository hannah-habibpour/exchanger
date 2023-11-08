import React, { useState, useEffect } from "react";
import '../style.css'
function Home() {

	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("/exchanges/avg/Bahmani/currency-pairs")
		  	.then((res) => res.json())
			.then((data) => setData(data.data))
			.catch(error => console.log(error))
	}, []);
	
	return (
		<div>
			<div>
				<table className='currencyPrice'>
					<thead>
					<tr>
						<th>Name</th>
						<th>Sell</th>
						<th>Buy</th>
					</tr>
					</thead>
					<tbody>
					{data.map((item) => (
						<tr key={item._id}>
							<td>{item.currencyPair}</td>
							<td>{item.price.sellPrice}</td>
							<td>{item.price.buyPrice}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
			<div className="selectCurrency">
				<div>Select a Currency pair:</div>
				<div>
					<select name="selectCurrencyPair" defaultValue="cad-irr">
						<option value="cad-irr">CAD-IRR</option>
						<option value="usd-irr">USD-IRR</option>
						<option value="usd-cad">USD-CAD</option>
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
							<tr>
								<td>Bahmani</td>
								<td>38.000</td>
								<td>36.000</td>
							</tr>
							<tr>
								<td>Mesghal</td>
								<td>37.000</td>
								<td>37.000</td>
							</tr>
							<tr>
								<td>Hafez</td>
								<td>38.000</td>
								<td>38.000</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Home;
