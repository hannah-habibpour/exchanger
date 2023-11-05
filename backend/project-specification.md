# Project Specification

## Main Page

- **Navbar**
- **List of Most Recent Currency Buy/Sell Prices for All Currency Pairs**
  - Retrieve the most recent buy/sell prices for all currency pairs for user "h"
    - **GET** `/exchanges/exchange-name/currency-pairs` _(Public)_
- **List of Buy/Sell Prices for Filtered Currency Pair at all Exchanges**
  - Retrieve the most recent buy/sell prices for the selected currency pair at all exchanges
    - **GET** `/currency-pairs/currency-pair` _(Public)_

## Exchange Profile Page

- **Information about the Exchange**
  - Retrieve information for the selected user
    - **GET** `/exchanges/exchange-name/profile` _(Public)_
- **List of Most Recent Currency Buy/Sell Prices for All Currencies at This Exchange**
  - Retrieve the most recent buy/sell prices for all currency pairs for the selected user
    - **GET** `/exchanges/exchange-name/currency-pairs` _(Public)_

## Exchange Profile Edit Page

- **Information about the Exchange (as Input Fields)**
  - Retrieve information for the selected user
    - **GET** `/exchanges/exchange-name/profile` _(Public)_
  - Update the information
    - **PUT** `/exchanges/exchange-name/profile` _(Private/exchange-name)_
- **List of Most Recent Currency Buy/Sell Prices for All Currencies at This Exchange (as Input Fields)**
  - Retrieve the most recent buy/sell prices for all currency pairs for the selected user
    - **GET** `/exchanges/exchange-name/currency-pairs` _(Public)_
  - Post a new buy/sell price for a given currency pair and return the posted value at the given exchange
    - **POST** `/exchanges/exchange-name/currency-pair` _(Private/exchange-name)_

## Sign Up Page

- (Provide details for the sign-up process)

## Login Page

- (Provide details for the login process)
