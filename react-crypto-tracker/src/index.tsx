import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// React Query Start
const queryClient = new QueryClient();

root.render(
  // queryClient를 props에 담아주자
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
