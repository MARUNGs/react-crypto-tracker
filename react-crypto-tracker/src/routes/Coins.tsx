// import { useEffect, useState } from "react";
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
import ICoins from "../types/CoinsInterface";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

function Coins() {
  const { isLoading: loading, data: coinList } = useQuery<ICoins[], Error>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 100),
  });

  // atom의 값을 설정하는 훅: useSetRecoilState() (like. setState())
  const setTheme = useSetRecoilState(isDarkAtom);
  const toggleTheme = () => setTheme((current) => !current);

  /*
  // React Query를 사용하게 되면 이건 필요없어짐... 기록용으로 보관하자.

  const [coinList, setCoinList] = useState<ICoins[]>([]);
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
  */

  return (
    <>
      <Container>
        <Helmet>
          <title>Coins</title>
        </Helmet>
        <Header>
          <Title>Coins</Title>
          <button onClick={toggleTheme}>밤낮변경</button>
        </Header>

        {loading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <CoinsList>
            {coinList?.map((coin) => (
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
