import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams, Link } from "react-router-dom";
import InfoData from "../types/CoinInterface";
import PriceData from "../types/CoinInterface";
import {
  Container,
  Header,
  Title,
  Loader,
  Overview,
  OveriewItem,
  DescriptionP,
  Tabs,
  Tab,
} from "../styles/CoinStyled";

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<string>();
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <>
      <Container>
        <Header>
          <Title>
            Coin -{" "}
            {state?.name ? state.name : loading ? "Loading ..." : info?.name}
          </Title>
        </Header>

        {loading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <>
            <Overview>
              <OveriewItem>
                <span>Rank: </span>
                <span>{info?.rank}</span>
              </OveriewItem>
              <OveriewItem>
                <span>Symbol</span>
                <span>{info?.symbol}</span>
              </OveriewItem>
              <OveriewItem>
                <span>Open Source: </span>
                <span>{info?.open_source ? `yes` : `no`}</span>
              </OveriewItem>
            </Overview>

            <DescriptionP>{info?.description}</DescriptionP>

            <Overview>
              <OveriewItem>
                <span>Total Syply: </span>
                <span>{price?.total_supply}</span>
              </OveriewItem>
              <OveriewItem>
                <span>Max Supply</span>
                <span>{price?.max_supply}</span>
              </OveriewItem>
            </Overview>

            <Tabs>
              <Tab>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
              <Tab>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
            </Tabs>

            {/* Link URL에 따라 아래의 컴포넌트가 다르게 보여짐. */}
            <Outlet />
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
