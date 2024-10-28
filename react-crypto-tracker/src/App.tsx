import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { GlobalStyle } from "./styles/AppStyled";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);

  return (
    <>
      {/* ThemeProvider 위치 변경 index.tsx -> App.tsx */}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>밤낮변경</button>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
