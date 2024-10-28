// import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useParams,
  Link,
  useMatch,
} from "react-router-dom";
import { Helmet } from "react-helmet";
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
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

function Coin() {
  const { coinId } = useParams<string>();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // 상세페이지에서도 useQuery로 API 관리를 하게 되었으니 더이상 Loading이 보여지지 않게 된다.
  // 왜냐하면 API data를 cache에서 보관하기 시작했으므로.
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(`${coinId}`),
  });

  const { isLoading: priceLoading, data: price } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(`${coinId}`),
    refetchInterval: 5000,
  });

  const loading = infoLoading || priceLoading;

  /* react-query 사용을 위한 기존 소스 주석처리
  const [loading, setLoading] = useState(true);
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
  */

  return (
    <>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading ..." : info?.name}
          </title>
        </Helmet>
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
              <OveriewItem>
                <span>Price: </span>
                <span>${price?.quotes.USD.price.toFixed(2)}</span>
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
              <Tab $isActive={priceMatch ? true : false}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
              <Tab $isActive={chartMatch ? true : false}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
            </Tabs>

            {/* Link URL에 따라 아래의 컴포넌트가 다르게 보여짐. */}
            <Outlet
              context={{
                coinId,
              }}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
