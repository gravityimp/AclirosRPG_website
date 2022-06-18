import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);
