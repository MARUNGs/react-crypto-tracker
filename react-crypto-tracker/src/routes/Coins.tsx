import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Title,
  Loader,
  CoinsList,
  Coin,
  Img,
} from "../styles/CoinsStyled";
import CoinInterface from "../types/CoinsInterface";

function Coins() {
  const [coinList, setCoinList] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // Call API - 즉시실행 함수 사용
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await res.json();

      setCoinList(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>

        {loading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <CoinsList>
            {coinList.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
