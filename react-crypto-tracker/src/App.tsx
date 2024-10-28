import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { GlobalStyle } from "./styles/AppStyled";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

function App() {
  // atom의 값을 감지하기 위한 훅: useRecoilValue
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      {/* ThemeProvider 위치 변경 index.tsx -> App.tsx */}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
