import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
// redux
// import { Provider as ReduxProvider } from "react-redux";
// import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReduxProvider store={store}> */}
      <App />
      {/* </ReduxProvider> */}
    </QueryClientProvider>
  </StrictMode>,
);
