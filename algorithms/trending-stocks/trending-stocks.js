const SYMBOLS_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/stock-symbols';
const MARKET_CAPS_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/stock-market-caps';
const PRICES_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/stock-prices';

function getTopMarketCaps(marketCaps) {
  return marketCaps.sort(
    (cap1, cap2) => cap2['market-cap'] - cap1['market-cap']
  );
}

function symbolToMarketCap(topMarkets) {
  return topMarkets.reduce(
    (acc, market) => ({
      ...acc,
      [market['symbol']]: market['market-cap'],
    }),
    {}
  );
}

function symbolToName(symbols) {
  return symbols.reduce(
    (acc, symbol) => ({
      ...acc,
      [symbol['symbol']]: symbol['name'],
    }),
    {}
  );
}

async function trendingStocks(n) {
  const [marketCapsPromise, symbolsPromise] = await Promise.all([
    fetch(MARKET_CAPS_API_BASE_URL),
    fetch(SYMBOLS_API_BASE_URL),
  ]);

  const [marketCaps, symbols] = await Promise.all([
    marketCapsPromise.json(),
    symbolsPromise.json(),
  ]);

  const topMarketCaps = getTopMarketCaps(marketCaps);
  const nTopMarkets = topMarketCaps.slice(0, n);
  const topSymbols = nTopMarkets.map((market) => market['symbol']);

  const prices = await (
    await fetch(`${PRICES_API_BASE_URL}?symbols=${JSON.stringify(topSymbols)}`)
  ).json();
  const symbolToMarketCapMap = symbolToMarketCap(nTopMarkets);
  const symbolToNameMap = symbolToName(symbols);

  return prices.map((price) => ({
    ...price,
    'market-cap': symbolToMarketCapMap[price['symbol']],
    name: symbolToNameMap[price['symbol']],
  }));
}
