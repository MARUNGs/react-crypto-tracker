import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/***** Styled ******/
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: whitesmoke;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

/***** Types ******/
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

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
