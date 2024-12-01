import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./styled/GlobalStyle.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <App />
    </StrictMode>
  </QueryClientProvider>
);
