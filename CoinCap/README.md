# CoinCap Data Fetching Project

This project demonstrates how to fetch real-time cryptocurrency data from the CoinCap API using vanilla JavaScript and display it on a simple dashboard.

## Overview

The CoinCap API provides access to live market data for various cryptocurrencies, including Bitcoin, Ethereum, and many others. This project fetches the data and displays it on a dashboard with up-to-date information such as market cap, volume, and prices.

## Features

- Fetch real-time data of cryptocurrencies from CoinCap API.
- Display data such as the current price, market cap, and 24-hour volume.
- Visualize the data in a dashboard format.

## Usage

### 1. Clone the Repository

To start, clone the repository to your local machine:

```bash
git clone https://github.com/AslanReza/Exercises-and-Replicas.git
cd Exercises-and-Replicas/CoinCap
```

### 2. Open `index.html` in a Browser

No server is required for this project as it uses vanilla JavaScript. Simply open the `index.html` file in your preferred browser, and the dashboard will load with real-time cryptocurrency data.

### 3. Refresh for Latest Data

The data on the dashboard refreshes automatically every 10 seconds, so you don't need to do anything manually to stay updated.

## API Documentation

### Base URL

The base URL for the CoinCap API is:[CoinCap API](https://api.coincap.io/v2)

### Endpoints

1. **Get a List of Assets**

   Fetch a list of all cryptocurrencies available on CoinCap.

   - **Endpoint**: `/assets`
   - **Method**: `GET`
   - **Example Request**:  
     `https://api.coincap.io/v2/assets`
   - **Response Example**:
     ```json
     {
       "data": [
         {
           "id": "bitcoin",
           "rank": 1,
           "symbol": "BTC",
           "name": "Bitcoin",
           "priceUsd": "57000.00",
           "marketCapUsd": "1050000000000",
           "volumeUsd24Hr": "8000000000",
           "supply": "18500000",
           "changePercent24Hr": "-2.5",
           "vwap24Hr": "56000"
         },
         ...
       ]
     }
     ```

2. **Get Specific Asset Details**

   Fetch details for a specific cryptocurrency by its ID or symbol.

   - **Endpoint**: `/assets/{id}`
   - **Method**: `GET`
   - **Example Request**:  
     `https://api.coincap.io/v2/assets/bitcoin`
   - **Response Example**:
     ```json
     {
       "data": {
         "id": "bitcoin",
         "rank": 1,
         "symbol": "BTC",
         "name": "Bitcoin",
         "priceUsd": "57000.00",
         "marketCapUsd": "1050000000000",
         "volumeUsd24Hr": "8000000000",
         "supply": "18500000",
         "changePercent24Hr": "-2.5",
         "vwap24Hr": "56000"
       }
     }
     ```

3. **Get Market Data for a Specific Asset**

   Fetch market data for a particular cryptocurrency.

   - **Endpoint**: `/assets/{id}/history`
   - **Method**: `GET`
   - **Example Request**:  
     `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`
   - **Response Example**:
     ```json
     {
       "data": [
         {
           "time": 1636626000000,
           "priceUsd": "57000.00",
           "marketCapUsd": "1050000000000",
           "volumeUsd24Hr": "8000000000"
         },
         ...
       ]
     }
     ```

### Parameters

- `interval`: Defines the frequency of the historical data. Can be one of the following values:
  - `m1` - 1 minute
  - `h1` - 1 hour
  - `d1` - 1 day
- `limit`: Limits the number of records returned. For example, use `limit=5` to get the last 5 records.

For more detailed information, please refer to the [CoinCap API Documentation](https://coincap.io/docs/).

### Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request.

### License

This project is open source and available under the [MIT License](LICENSE).
