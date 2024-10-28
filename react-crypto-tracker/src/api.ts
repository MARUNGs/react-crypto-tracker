// React Query를 활용한 API 모음
// 반드시 fetch promise를 리턴해주어야 한다.

const BASE_URL = `https://api.coinpaprika.com/v1`;
const AFTER_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 // 일주일 전
  return fetch(`${AFTER_URL}/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
