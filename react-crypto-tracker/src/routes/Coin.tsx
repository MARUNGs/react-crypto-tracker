import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
const Loader = styled.span`
  text-align: center;
  display: block;
`;

/***** Types *****/
interface RouteState {
  name: string;
  hash: string;
  key: string;
  pathname: string;
  search: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();

  // Q. Link의 state에 담은 데이터는 어떻게 데려올 수 있을까?
  // A. Use "useLocation" Hook
  const { state } = useLocation();

  return (
    <>
      <Container>
        <Header>
          {/* localhost:3000/name 으로 들어오거나, localhost:3000으로 들어올 때의
              Link의 state 생성과정은 다르기 때문에 state 값이 없으면 Loading... 이 보여지도록 처리한다.
              왜냐하면 state는 Link를 클릭할 때 만들어주기 때문이다. */}
          <Title>Coin: {state?.name || `Loading ...`}</Title>
        </Header>

        {loading ? <Loader>Loading ...</Loader> : null}
      </Container>
    </>
  );
}

export default Coin;
