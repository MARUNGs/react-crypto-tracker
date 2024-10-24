import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { GlobalStyle } from "./styles/AppStyled";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
