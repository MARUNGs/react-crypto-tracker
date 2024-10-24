// React Query를 활용한 API 모음
// 반드시 fetch promise를 리턴해주어야 한다.

const BASE_URL = `https://api.coinpaprika.com/v1`;

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
