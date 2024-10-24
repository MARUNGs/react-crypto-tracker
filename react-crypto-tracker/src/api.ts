// React Query를 활용한 API 모음
// 반드시 fetch promise를 리턴해주어야 한다.

export async function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
