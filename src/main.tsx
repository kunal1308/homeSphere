import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import theme from "./theme";
import { LoaderProvider } from "./context/LoaderContext";
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoaderProvider>
        <App />
      </LoaderProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </ThemeProvider>
  </React.StrictMode>
);