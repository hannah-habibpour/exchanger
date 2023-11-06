import '../style.css'
function Home() {

	return (
		<div>
			<div>
				<table className='currencyPrice'>
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
			<div className="selectCurrency">
				<div>Select a Currency pair:</div>
				<div>
					<select name="selectCurrencyPair" defaultValue="cad-irr">
						<option value="cad-irr">CAD-IRR</option>
						<option value="usd-irr">USD-IRR</option>
						<option value="usd-cad">USD-CAD</option>
					</select>
					<table>
						<tr>
							<th>Exchange</th>
							<th>Sell</th>
							<th>Buy</th>
						</tr>
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
					</table>
				</div>
			</div>
		</div>
	)
}

export default Home;
