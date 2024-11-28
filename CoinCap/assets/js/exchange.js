let exchangesTable = document.querySelector(".exchange_table");
let exchangesTableRow = document.querySelector(".exchange_table_row");

function renderExchange(data) {
  let exchangesTableRow = document.createElement("div");
  exchangesTableRow.classList.add("exchange_table_row");

  let rank = document.createElement("div");
  rank.textContent = data.rank;
  rank.classList.add("row_items");
  rank.classList.add("rank_row");

  let nameContainer = document.createElement("div");
  nameContainer.textContent = data.name;
  nameContainer.classList.add("row_items");
  nameContainer.classList.add("name_row");

  let tradingPairs = document.createElement("div");
  tradingPairs.textContent = data.tradingPairs;
  tradingPairs.classList.add("row_items");
  tradingPairs.classList.add("trading_row");

  let topPair = document.createElement("div");
  topPair.textContent = data.baseSymbol + "/" + data.quoteSymbol;
  topPair.classList.add("row_items");
  topPair.classList.add("top_row");

  let volumeUsd = document.createElement("div");
  volumeUsd.textContent = numeral(data.volumeUsd).format("($0.00a)");
  volumeUsd.classList.add("row_items");
  volumeUsd.classList.add("volume_row");

  let percentTotal = document.createElement("div");
  percentTotal.textContent = numeral(data.percentTotalVolume / 100).format(
    "(0.00%)"
  );
  percentTotal.classList.add("row_items");
  percentTotal.classList.add("total_row");

  let socketUnit = document.createElement("div");
  socketUnit.dataset = data.socket;
  socketUnit.classList.add("row_items");
  socketUnit.classList.add("status_row");
  let socketUnitColor = document.createElement("div");
  socketUnitColor.classList.add("socket");
  if (exchangesList.socket === true) {
    socketUnitColor.classList.add("green");
    socketUnitColor.classList.add("pulse_green");
  } else {
    socketUnitColor.classList.add("red");
    socketUnitColor.classList.add("pulse_red");
  }

  socketUnit.appendChild(socketUnitColor);

  exchangesTableRow.appendChild(rank);
  exchangesTableRow.appendChild(nameContainer);
  exchangesTableRow.appendChild(tradingPairs);
  exchangesTableRow.appendChild(topPair);
  exchangesTableRow.appendChild(volumeUsd);
  exchangesTableRow.appendChild(percentTotal);
  exchangesTableRow.appendChild(socketUnit);

  exchangesTable.appendChild(exchangesTableRow);
}

// FETCH
let exchangesBaseUrl = "https://api.coincap.io/v2";
let CurrentOffset = 0;

async function getExchangesList() {
  let AssetsUrl =
    "https://api.coincap.io/v2/exchanges?offset=" + CurrentOffset + "&limit=20";
  let responseExchanges = await fetch(AssetsUrl);
  let bodyExchanges = await responseExchanges.json();
  return bodyExchanges.data;
}

async function getMarketsList() {
  let MarketsUrl =
    "https://api.coincap.io/v2/markets?offset=" + CurrentOffset + "&limit=100";
  let responseMarkets = await fetch(MarketsUrl);
  let bodyMarkets = await responseMarkets.json();
  return bodyMarkets.data;
}

async function runLists() {
  const exchangeResponse = getExchangesList();
  const marketResponse = getMarketsList();

  const responses = await Promise.all([exchangeResponse, marketResponse]);
  const [exchanges, markets] = responses;

  const resultLists = [];
  exchanges.forEach((exchange) => {
    const exchangeMarketsInfo = markets.filter((market) => {
      return market.exchangeId === exchange.exchangeId;
    });

    let mostVolumeMarket = "0";
    let topPair = "";
    exchangeMarketsInfo.forEach((marketInfo) => {
      if (Number(marketInfo.volumeUsd24Hr) > Number(mostVolumeMarket)) {
        mostVolumeMarket = marketInfo.volumeUsd24Hr;
        topPair = `${marketInfo.baseSymbol}/${marketInfo.quoteSymbol}`;
      }
    });

    const exchangeWithMoreInfo = {
      ...exchanges,
      topPair: topPair,
    };
    resultLists.push(exchangeWithMoreInfo);
  });
  console.log(resultLists);
}

// const resultLists = [];
// async function renderExchangesList() {
//   for (let i = 0; i < resultLists.length; i++) {
//     let item = resultLists[i];
//     renderExchange(item);
//   }
// }
// VIEW MORE BUTTON
let moreButtonExchanges = document.querySelector("#more");
moreButtonExchanges.addEventListener("click", function (e) {
  e.preventDefault();
  CurrentOffset += 20;
  runLists();
});

// LOAD
function renderError(message) {
  let errorContainer = document.createElement("div");
  errorContainer.textContent = message;
  errorContainer.classList.add("error");

  exchangesTableRow.appendChild(errorContainer);
}

function renderLoadingExchanges() {
  let loadingContainer = document.createElement("div");
  loadingContainer.textContent = "Loading....";
  loadingContainer.classList.add("loading");

  exchangesTableRow.appendChild(loadingContainer);
}

function removeLoadingExchanges() {
  let loadingEl = document.querySelector(".loading");
  exchangesTableRow.removeChild(loadingEl);
}

// TEST & ERROR
renderLoadingExchanges();
runLists()
  .catch(function (error) {
    renderError(error.toString());
  })
  .finally(function () {
    removeLoadingExchanges();
  });
